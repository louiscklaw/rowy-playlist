import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function CreatedBy(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M19 13v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2Zm-9 0c.87 0 2.022.142 3.18.426a5.967 5.967 0 0 0-.891 1.73A11.097 11.097 0 0 0 10 14.9c-1.188 0-2.402.234-3.43.555l-.43.143c-.138.049-.272.099-.402.15l-.372.157C4.475 16.3 3.9 16.725 3.9 17v1.1h8.2A5.96 5.96 0 0 0 12.803 20L2 20v-3c0-2.01 3.043-3.266 5.682-3.76l.46-.08.227-.033.44-.056A11.02 11.02 0 0 1 10 13Zm0-9a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 1.9a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Z" />
    </SvgIcon>
  );
}
