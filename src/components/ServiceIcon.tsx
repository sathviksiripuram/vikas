import {
  BookOpen,
  Compass,
  FileText,
  Search,
  Stamp,
  Wallet,
} from "lucide-react";
import type { Service } from "@/lib/services";

const icons = {
  compass: Compass,
  book: BookOpen,
  search: Search,
  file: FileText,
  wallet: Wallet,
  stamp: Stamp,
} as const;

export default function ServiceIcon({
  name,
  className = "size-5",
}: {
  name: Service["icon"];
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden />;
}
