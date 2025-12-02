"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";

interface DetectedItem {
  id: string;
  name: string;
  confidence: number;
  selected: boolean;
}

interface ConfirmationScreenProps {
  imageData: string;
  detectedItems: DetectedItem[];
  onConfirm: (selectedItems: DetectedItem[]) => void;
  onRetake: () => void;
}

export function ConfirmationScreen({
  imageData,
  detectedItems: initialItems,
  onConfirm,
  onRetake,
}: ConfirmationScreenProps) {
  const [items, setItems] = useState(initialItems);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
    );
  };

  const selectedCount = items.filter((item) => item.selected).length;

  const handleConfirm = () => {
    const selectedItems = items.filter((item) => item.selected);
    if (selectedItems.length > 0) {
      onConfirm(selectedItems);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={onRetake}>
            <X className="w-5 h-5" />
          </Button>
          <h2 className="font-semibold">Confirm Ingredients</h2>
          <div>&nbsp;</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {/* Captured Image Preview */}
        <Card className="overflow-hidden">
          <div className="relative aspect-video bg-muted/30">
            {imageData ? (
              <img
                src={imageData}
                alt="Captured ingredients"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground space-y-2">
                  <div className="text-6xl">📸</div>
                  <p className="text-sm">Captured Image</p>
                </div>
              </div>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={onRetake}
              className="absolute bottom-3 right-3 gap-2 shadow-lg"
            >
              <Pencil className="w-4 h-4" />
              Retake
            </Button>
          </div>
        </Card>

        {/* Detected Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Detected Items ({items.length})</h3>
            <Badge variant="secondary">{selectedCount} selected</Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Tap to select/deselect ingredients you want to use
          </p>

          <div className="grid gap-3">
            {items.map((item) => (
              <Card
                key={item.id}
                className={`p-4 cursor-pointer transition-all ${
                  item.selected ? "border-primary bg-primary/5 shadow-sm" : "hover:bg-muted/50"
                }`}
                onClick={() => toggleItem(item.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        item.selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30"
                      }`}
                    >
                      {item.selected && <Check className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.round(item.confidence * 100)}% confidence
                      </p>
                    </div>
                  </div>
                  <Badge variant={item.confidence > 0.8 ? "default" : "secondary"}>
                    {item.confidence > 0.8 ? "High" : "Medium"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 p-6 bg-card border-t shadow-lg">
        <Button size="lg" onClick={handleConfirm} disabled={selectedCount === 0} className="w-full">
          Generate Recipes ({selectedCount} items)
        </Button>
      </div>
    </div>
  );
}
