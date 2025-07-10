import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useMemo, ReactNode } from "react";

interface CardRotateProps {
  children: ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
}

function CardRotate({ children, onSendToBack, sensitivity }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: unknown, info: { offset: { x: number; y: number } }) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
    } else {
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export interface CardData {
  id: number;
  img: string;
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  cardsData?: CardData[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
}

export default function Stack({
  randomRotation = false,
  sensitivity = 200,
  cardDimensions = { width: 208, height: 208 },
  cardsData = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
}: StackProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [cards, setCards] = useState(
    cardsData.length
      ? cardsData
      : [
          { id: 1, img: "/uspic/IMG-20231220-WA0014.jpg" },
          { id: 2, img: "/uspic/IMG-20231220-WA0017.jpg" },
          { id: 3, img: "/uspic/IMG-20240630-WA0008.jpg" },
          { id: 4, img: "/uspic/IMG-20240630-WA0023.jpg" },
          { id: 5, img: "/uspic/IMG-20241009-WA0014.jpg" },
          { id: 6, img: "/uspic/IMG-20241009-WA0037.jpg" },
          { id: 7, img: "/uspic/IMG-20241009-WA0052.jpg" },
          { id: 8, img: "/uspic/IMG-20241010-WA0035.jpg" },
          { id: 9, img: "/uspic/IMG-20241010-WA0046.jpg" },
          { id: 10, img: "/uspic/IMG-20241010-WA0049.jpg" },
          { id: 11, img: "/uspic/IMG-20241010-WA0062.jpg" },
          { id: 12, img: "/uspic/IMG-20241010-WA0065.jpg" },
          { id: 13, img: "/uspic/IMG-20241011-WA0034.jpg" },
          { id: 14, img: "/uspic/IMG-20241011-WA0036.jpg" },
          { id: 15, img: "/uspic/IMG-20241012-WA0042.jpg" },
          { id: 16, img: "/uspic/IMG-20241012-WA0057.jpg" },
        ]
  );

  // Generate random rotations (client only, after mount)
  const randomRotations = useMemo(
    () =>
      randomRotation
        ? cards.map(() => Math.random() * 10 - 5)
        : cards.map(() => 0),
    [cards.length, randomRotation]
  );

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      if (index !== -1) {
        const [card] = newCards.splice(index, 1);
        newCards.unshift(card);
      }
      return newCards;
    });
  };

  if (!mounted) return null;

  return (
    <div
      className="relative"
      style={{
        width: `${cardDimensions.width}px`,
        height: `${cardDimensions.height}px`,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotations[index] || 0;

        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
          >
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-white"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping,
              }}
              style={{
                width: `${cardDimensions.width}px`,
                height: `${cardDimensions.height}px`,
              }}
            >
              <img
                src={card.img}
                alt={`card-${card.id}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
