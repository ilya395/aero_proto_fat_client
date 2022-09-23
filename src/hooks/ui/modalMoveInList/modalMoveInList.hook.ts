import { useCallback, useState } from "react";

const useModalMoveInList = (arg: { deleteCallback?: (id: string) => void; }) => {
  const {
    deleteCallback,
  } = arg;

  const [showDeleteModalId, setShowDeleteModalId] = useState<string | null>(null);
  const handleCloseModal = useCallback(() => setShowDeleteModalId(null), []);
  const handleShowModal = useCallback((id: string) => setShowDeleteModalId(id), []);
  const handleActionModal = useCallback(() => {
    deleteCallback && showDeleteModalId && deleteCallback(showDeleteModalId);
    setShowDeleteModalId(null);
  }, [deleteCallback, showDeleteModalId]);

  return {
    showDeleteModalId,
    handleCloseModal,
    handleShowModal,
    handleActionModal,
  }
}

export default useModalMoveInList