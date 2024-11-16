import { Chat, Project } from "./Schema.js";
import { v4 as uuid } from "uuid";

const SocketHandler = (socket, io) => {
  socket.on("join-chat-room", async ({ projectId, freelancerId, clientId }) => {
    const project = await Project.findById(projectId);

    if (
      project.freelancerId === freelancerId ||
      project.clientId === clientId
    ) {
      await socket.join(projectId);

      socket.broadcast.to(projectId).emit("user-joined-room");

      const chats = await Chat.findOne({ _id: projectId });

      if (!chats) {
        const newChat = new Chat({
          _id: projectId,
          messages: [],
        });

        await newChat.save();
      }

      await socket.emit("messages-updated", { chats });
    }
  });

  socket.on("join-chat-room-client", async ({ projectId }) => {
    const project = await Project.findById(projectId);

    if (project.status === "Assigned" || project.status === "Completed") {
      await socket.join(projectId);

      socket.broadcast.to(projectId).emit("user-joined-room");

      const chats = await Chat.findById(projectId);

      if (!chats) {
        const newChat = new Chat({
          _id: projectId,
          messages: [],
        });

        await newChat.save();
      }

      await socket.emit("messages-updated", { chats });
    }
  });

  socket.on("update-messages", async ({ projectId }) => {
    try {
      const chat = await Chat.findOne({ projectId });
      socket.emit("messages-updated", { chat });
    } catch (error) {
      console.error("Error updating messages:", error);
    }
  });

  socket.on("new-message", async ({ projectId, senderId, message, time }) => {
    try {
      await Chat.findOneAndUpdate(
        { _id: projectId },
        {
          $addToSet: {
            messages: { id: uuid(), text: message, senderId, time },
          },
        },
        { new: true }
      );

      const chat = await Chat.findOne({ _id: projectId });
      socket.emit("messages-updated", { chat });
      io.to(projectId).emit("message-from-user");
    } catch (error) {
      console.error("Error adding new message:", error);
    }
  });
};

export default SocketHandler;
