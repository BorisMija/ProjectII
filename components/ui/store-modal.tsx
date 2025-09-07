"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

export const StoreModal = () => {
  const isOpen = useStoreModal((s) => s.isOpen);
  const onClose = useStoreModal((s) => s.onClose);

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-4 text-sm text-muted-foreground">
        Future Create Store Form
      </div>
    </Modal>
  );
};


