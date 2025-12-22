"use client";

import Modal from "@/components/ui/modal";
import { useDeleteChat } from "@/modules/chat/hooks/chat";

import React from "react";
import { toast } from "sonner";

interface DeleteChatModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  chatId: string;
}

const DeleteChatModal = ({
  isModalOpen,
  setIsModalOpen,
  chatId,
}: DeleteChatModalProps) => {
  const { mutateAsync, isPending } = useDeleteChat(chatId);

  const handleDelete = async (): Promise<void> => {
    try {
      await mutateAsync();
      toast.success("Chat deleted successfully");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete Chat");
      console.error("Failed to delete Chat:", err);
    }
  };

  return (
    <Modal
      title="Delete Chat"
      description="Are you sure you want to delete this Chat? This action cannot be undone."
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleDelete}
      submitText={isPending ? "Deleting..." : "Delete"}
      submitVariant="destructive"
    >
      <p className="text-sm text-zinc-500">
        Once deleted, all requests and data in this Chat will be permanently
        removed.
      </p>
    </Modal>
  );
};

export default DeleteChatModal;
