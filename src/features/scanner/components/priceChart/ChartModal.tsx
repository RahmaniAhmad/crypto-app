"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

import { PriceChart } from "./PriceChart";
import { PricePoint } from "@/features/market/types";

interface Props {
  symbol: string;
  data: PricePoint[];
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
}

export function ChartModal({
  symbol,
  data,
  isOpen,
  isLoading,
  onClose,
}: Props) {
  return (
    <Modal size="5xl" isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>{symbol} Price Chart</ModalHeader>

        {isLoading ? (
          <div className="flex h-80 items-center justify-center">
            Loading chart...
          </div>
        ) : (
          <PriceChart symbol={symbol} data={data} />
        )}
      </ModalContent>
    </Modal>
  );
}
