"use client";

import Lottie, { Options } from "react-lottie";

type Props = {
  options: Options;
  height?: number;
  width?: number;
  className?: string;
};

export default function LottieConfetti({ options, height = 200, width = 400, className }: Props) {
  return (
    <div className={className}>
      <Lottie options={options} height={height} width={width} />
    </div>
  );
}
