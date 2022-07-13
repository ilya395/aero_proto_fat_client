export interface ILoginFormProps {
  login?: string;
  password?: string;
  handleSubmit?: (event: React.SyntheticEvent) => void;
  handleChange?: (arg: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  validated?: boolean;
}