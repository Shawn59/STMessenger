export interface ISearchInputAtom {
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
  skeleton?: boolean;
  disabled?: boolean;
  onClear?: () => void;
}
