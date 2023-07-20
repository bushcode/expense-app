import {
  BadgeDollarSign,
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  Loader2,
  Plus,
  Trash,
  Eye,
  X,
  Wallet,
  Home,
  Banknote,
  MoreVertical,
} from "lucide-react";

export const Icons = {
  Logo: BadgeDollarSign,
  arrowRight: ArrowRight,
  close: X,
  spinner: Loader2,
  add: Plus,
  check: Check,
  eye: Eye,
  wallet: Wallet,
  home: Home,
  banknote: Banknote,
  trash: Trash,
  chevronLeft: ChevronLeft,
  alert: AlertTriangle,
  more: MoreVertical,
};

export type Icon = keyof typeof Icons;
