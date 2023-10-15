"use client"

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null
    }

    return (
        <Modal
            title="Are You Sure?"
            description="This action cannot be undone"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="p-4 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    cancel
                </Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                    DELETE
                </Button>
            </div>
        </Modal>
    )
}