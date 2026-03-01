import type { Metadata } from "next"

import { TransformationLab } from "@/components/transformation-lab"

export const metadata: Metadata = {
  title: "转化实验室 | 萌宠星球",
  description: "在这里，思念被精心转化——像跨维度传送阵一样的仪式感空间。",
}

export default function LabPage() {
  return <TransformationLab />
}

