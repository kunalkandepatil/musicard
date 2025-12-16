export type ProgressBarStyle = {
  barColor: string;
  barColorDuo?: boolean;
};

export type VolumeBarStyle = {
  barColor: string;
  barColorDuo?: boolean;
};

export const BloomBS = ({
  isExplicit = false,
  progressBar = 0,
  progressBarStyle = { barColor: "#fff" },
  backgroundColor = "black",
  explicitColor = "white",
  explicitOpacity = 48 / 100,
}: {
  isExplicit?: boolean;
  progressBar?: number;
  progressBarStyle?: ProgressBarStyle;
  backgroundColor?: string;
  explicitColor?: string;
  explicitOpacity?: number;
} = {}): string => {
  const safeProgress = Number.isFinite(progressBar) ? progressBar : 0;
  const progressWidth = Math.min(Math.max(safeProgress, 0), 100) / 100 * 705.85;
  return `<svg width="1415" height="477" viewBox="0 0 1415 477" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1415" height="477" fill="url(#paint0_linear_18_51)"/>

<rect x="529.415" y="303.295" width="705.85" height="24.815" rx="12.4075" fill="${progressBarStyle.barColorDuo ? progressBarStyle.barColor : 'white'}" fill-opacity="0.14"/>
<rect x="529.415" y="303.295" width="${progressWidth}" height="24.815" rx="12.4075" fill="${progressBarStyle.barColor}"/>

${isExplicit ? `<path fill-rule="evenodd" clip-rule="evenodd" d="M546.333 185C537.313 185 530 192.313 530 201.333V217.667C530 226.687 537.313 234 546.333 234H562.667C571.687 234 579 226.687 579 217.667V201.333C579 192.313 571.687 185 562.667 185H546.333ZM553.31 207.722V203.47H561.066V199.368H548.19V220.389H561.066V216.287H553.31V211.675H560.168V207.722H553.31Z" fill="${explicitColor}" fill-opacity="${explicitOpacity}"/>` : ''}
<defs>
<linearGradient id="paint0_linear_18_51" x1="0" y1="238.5" x2="1415" y2="238.5" gradientUnits="userSpaceOnUse">
<stop stop-color="${backgroundColor}" stop-opacity="0"/>
<stop stop-color="${backgroundColor}" offset="0.5" stop-opacity="0.78"/>
<stop stop-color="${backgroundColor}" offset="1"/>
</linearGradient>
</defs>
</svg>`;
};


export const HazeBS = ({
  isExplicit = false,
  progressBar = 0,
  progressBarStyle = { barColor: "#fff" },
  backgroundColor = "black",
  explicitColor = "white",
  explicitOpacity = 48 / 100,
}: {
  isExplicit?: boolean;
  progressBar?: number;
  progressBarStyle?: ProgressBarStyle;
  backgroundColor?: string;
  explicitColor?: string;
  explicitOpacity?: number;
} = {}): string => {
  const safeProgress = Number.isFinite(progressBar) ? progressBar : 0;
  const progressWidth = Math.min(Math.max(safeProgress, 0), 100) / 100 * 1095;
  return `<svg width="1415" height="477" viewBox="0 0 1415 477" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1415" height="477" fill="url(#paint0_linear_18_51)"/>

<rect x="140.264" y="303.202" width="1095" height="25" rx="12.5" fill="${progressBarStyle.barColorDuo ? progressBarStyle.barColor : 'white'}" fill-opacity="0.14"/>
<rect x="140.264" y="303.202" width="${progressWidth}" height="25" rx="12.5" fill="${progressBarStyle.barColor}"/>

${isExplicit ? `<path fill-rule="evenodd" clip-rule="evenodd" d="M156.333 185C147.313 185 140 192.313 140 201.333V217.667C140 226.687 147.313 234 156.333 234H172.667C181.687 234 189 226.687 189 217.667V201.333C189 192.313 181.687 185 172.667 185H156.333ZM163.31 207.722V203.47H171.066V199.368H158.19V220.389H171.066V216.287H163.31V211.675H170.168V207.722H163.31Z" fill="${explicitColor}" fill-opacity="${explicitOpacity}"/>` : ''}
<defs>
<linearGradient id="paint0_linear_18_51" x1="1415" y1="238.5" x2="0" y2="238.5" gradientUnits="userSpaceOnUse">
<stop stop-color="${backgroundColor}" stop-opacity="0"/>
<stop stop-color="${backgroundColor}" offset="0.5" stop-opacity="0.78"/>
<stop stop-color="${backgroundColor}" offset="1"/>
</linearGradient>
</defs>
</svg>`;
};

export const DriftBS = ({
  isExplicit = false,
  progressBar = 0,
  progressBarStyle = { barColor: "#fff" },
  backgroundColor = "black",
  explicitColor = "white",
  explicitOpacity = 48 / 100,
}: {
  isExplicit?: boolean;
  progressBar?: number;
  progressBarStyle?: ProgressBarStyle;
  backgroundColor?: string;
  explicitColor?: string;
  explicitOpacity?: number;
} = {}): string => {
  const safeProgress = Number.isFinite(progressBar) ? progressBar : 0;
  const progressWidth = Math.min(Math.max(safeProgress, 0), 100) / 100 * 759;
  return `<svg width="1415" height="380" viewBox="0 0 1415 380" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1415" height="380" fill="url(#paint0_linear_42_78)"/>

${isExplicit ? `<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M497 137C488.716 137 482 143.716 482 152V167C482 175.284 488.716 182 497 182H512C520.284 182 527 175.284 527 167V152C527 143.716 520.284 137 512 137H497ZM503.407 157.868V153.962H510.53V150.195H498.705V169.5H510.53V165.733H503.407V161.497H509.705V157.868H503.407Z\" fill=\"${explicitColor}\" fill-opacity=\"${explicitOpacity}\"/>` : ''}

<rect x="482" y="239" width="759" height="25" rx="12.5" fill="${progressBarStyle.barColorDuo ? progressBarStyle.barColor : 'white'}" fill-opacity="0.14"/>
<rect x="482" y="239" width="${progressWidth}" height="25" rx="12.5" fill="${progressBarStyle.barColor}"/>
<defs>

<linearGradient id="paint0_linear_42_78" x1="0" y1="190" x2="1415" y2="190" gradientUnits="userSpaceOnUse">
<stop stop-color="${backgroundColor}" stop-opacity="0"/>
<stop stop-color="${backgroundColor}" offset="0.5" stop-opacity="0.78"/>
<stop stop-color="${backgroundColor}" offset="1"/>
</linearGradient>
</defs>
</svg>`;
};

export const CalmBS = ({
  progressBar = 0,
  progressBarStyle = { barColor: "#fff" },
  backgroundColor = "black",
}: {
  progressBar?: number;
  progressBarStyle?: ProgressBarStyle;
  backgroundColor?: string;
} = {}): string => {
  const safeProgress = Number.isFinite(progressBar) ? progressBar : 0;
  const progressWidth = Math.min(Math.max(safeProgress, 0), 100) / 100 * 577;
  return `<svg width="1415" height="380" viewBox="0 0 1415 380" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1415" height="380" fill="url(#paint0_linear_42_78)"/>

<rect x="419" y="256" width="577" height="25" rx="12.5" fill="${progressBarStyle.barColorDuo ? progressBarStyle.barColor : 'white'}" fill-opacity="0.14"/>
<rect x="419" y="256" width="${progressWidth}" height="25" rx="12.5" fill="${progressBarStyle.barColor}"/>

<defs>
<linearGradient id="paint0_linear_42_78" x1="707.5" y1="380" x2="707.5" y2="0" gradientUnits="userSpaceOnUse">
<stop stop-color="${backgroundColor}" stop-opacity="0"/>
<stop stop-color="${backgroundColor}" offset="0.5" stop-opacity="0.78"/>
<stop stop-color="${backgroundColor}" offset="1"/>
</linearGradient>
</defs>
</svg>`;
};

export const MeltBS = ({
  isExplicit = false,
  progressBar = 0,
  progressBarStyle = { barColor: "#fff" },
  volumeBar = 0,
  volumeBarStyle = { barColor: "#fff" },
  backgroundColor = "black",
  explicitColor = "white",
  explicitOpacity = 48 / 100,
}: {
  isExplicit?: boolean;
  progressBar?: number;
  progressBarStyle?: ProgressBarStyle;
  volumeBar?: number;
  volumeBarStyle?: VolumeBarStyle;
  backgroundColor?: string;
  explicitColor?: string;
  explicitOpacity?: number;
} = {}): string => {
  console.log(volumeBarStyle)
  const safeProgress = Number.isFinite(progressBar) ? progressBar : 0;
  const safeVolume = Number.isFinite(volumeBar) ? volumeBar : 0;
  const progressWidth = Math.min(Math.max(safeProgress, 0), 100) / 100 * 580;
  const volumeWidth = Math.min(Math.max(safeVolume, 0), 100) / 100 * 243;
  return `<svg width="1415" height="477" viewBox="0 0 1415 477" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1415" height="477" fill="${backgroundColor}"/>

<path fill-rule="evenodd" clip-rule="evenodd" d="M505.095 366.557C502.288 367.054 501.142 370.324 502.702 372.568L506.079 377.418C506.307 377.747 506.429 378.14 506.429 378.543L506.429 383.15C506.429 384.702 507.034 386.19 508.111 387.287C509.188 388.384 510.649 389 512.172 389L519.829 389C521.352 389 522.813 388.384 523.89 387.287C524.967 386.19 525.572 384.702 525.572 383.15L525.572 378.543C525.572 378.139 525.695 377.745 525.924 377.416L529.297 372.568C530.859 370.326 529.712 367.054 526.904 366.557C523.363 365.929 519.718 365.601 516 365.601C512.283 365.601 508.64 365.929 505.095 366.557ZM508.154 350.396C507.654 350.453 507.196 350.709 506.879 351.108C506.563 351.507 506.414 352.016 506.463 352.526C506.513 353.037 506.758 353.506 507.146 353.834C507.533 354.161 508.031 354.32 508.533 354.276C513.499 353.774 518.502 353.774 523.468 354.276C523.72 354.305 523.975 354.283 524.218 354.21C524.462 354.138 524.689 354.017 524.886 353.855C525.083 353.693 525.246 353.492 525.367 353.265C525.487 353.038 525.562 352.788 525.587 352.531C525.613 352.274 525.587 352.015 525.513 351.768C525.439 351.521 525.317 351.292 525.156 351.093C524.994 350.894 524.795 350.73 524.57 350.611C524.345 350.491 524.1 350.418 523.847 350.396C518.629 349.868 513.372 349.868 508.154 350.396ZM510.101 358.049C509.847 358.066 509.599 358.134 509.372 358.25C509.145 358.365 508.942 358.526 508.777 358.722C508.611 358.918 508.485 359.145 508.406 359.391C508.328 359.637 508.298 359.897 508.319 360.155C508.34 360.413 508.411 360.664 508.528 360.893C508.645 361.123 508.805 361.326 509 361.492C509.195 361.658 509.421 361.782 509.664 361.858C509.906 361.935 510.162 361.961 510.414 361.935C514.132 361.623 517.869 361.623 521.586 361.935C522.087 361.969 522.582 361.801 522.962 361.467C523.343 361.132 523.579 360.659 523.62 360.149C523.661 359.64 523.504 359.134 523.182 358.741C522.861 358.348 522.4 358.099 521.9 358.049C517.974 357.719 514.027 357.719 510.101 358.049Z" fill="${volumeBarStyle.barColor}"/>

<rect x="634" y="286" width="580" height="25" rx="12.5" fill="${progressBarStyle.barColorDuo ? progressBarStyle.barColor : 'white'}" fill-opacity="0.14"/>
<rect x="634" y="286" width="${progressWidth}" height="25" rx="12.5" fill="${progressBarStyle.barColor}"/>

<rect x="503" y="334" width="243" height="25" rx="12.5" transform="rotate(-90 503 334)" fill="${volumeBarStyle.barColorDuo ? volumeBarStyle.barColor : 'white'}" fill-opacity="0.14"/>
<rect x="503" y="334" width="${volumeWidth}" height="25" rx="12.5" transform="rotate(-90 503 334)" fill="${volumeBarStyle.barColor}"/>

${isExplicit ? `<path fill-rule="evenodd" clip-rule="evenodd" d="M649 198C640.716 198 634 204.716 634 213V228C634 236.284 640.716 243 649 243H664C672.284 243 679 236.284 679 228V213C679 204.716 672.284 198 664 198H649ZM655.407 218.868V214.962H662.53V211.195H650.705V230.5H662.53V226.733H655.407V222.497H661.705V218.868H655.407Z" fill="${explicitColor}" fill-opacity="${explicitOpacity}"/>` : ''}

</svg>`;
};

export const EaseBS = ({
  isExplicit = false,
  progressBar = 0,
  progressBarStyle = { barColor: "#fff" },
  volumeBar = 0,
  volumeBarStyle = { barColor: "#fff" },
  backgroundColor = "black",
  explicitColor = "white",
  explicitOpacity = 48 / 100,
}: {
  isExplicit?: boolean;
  progressBar?: number;
  progressBarStyle?: ProgressBarStyle;
  volumeBar?: number;
  volumeBarStyle?: VolumeBarStyle;
  backgroundColor?: string;
  explicitColor?: string;
  explicitOpacity?: number;
} = {}): string => {
  const safeProgress = Number.isFinite(progressBar) ? progressBar : 0;
  const safeVolume = Number.isFinite(volumeBar) ? volumeBar : 0;
  const progressWidth = Math.min(Math.max(safeProgress, 0), 100) / 100 * 318;
  const volumeWidth = Math.min(Math.max(safeVolume, 0), 100) / 100 * 160;

  return `<svg width="1415" height="350" viewBox="0 0 1415 350" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="1415" height="350" fill="url(#paint0_linear_61_14)"/>

<path fill-rule="evenodd" clip-rule="evenodd" d="M932.142 244.874C931.695 242.268 928.761 241.203 926.747 242.652L922.395 245.787C922.099 245.999 921.746 246.113 921.385 246.113L917.25 246.113C915.857 246.113 914.522 246.674 913.538 247.674C912.553 248.675 912 250.031 912 251.445V258.555C912 259.97 912.553 261.326 913.538 262.326C914.522 263.326 915.857 263.888 917.25 263.888H921.385C921.747 263.888 922.101 264.002 922.396 264.215L926.747 267.347C928.759 268.798 931.695 267.733 932.142 265.125C932.705 261.837 932.999 258.452 932.999 255C932.999 251.548 932.705 248.166 932.142 244.874ZM946.645 247.714C946.593 247.25 946.364 246.825 946.006 246.531C945.648 246.237 945.191 246.098 944.733 246.145C944.275 246.191 943.853 246.419 943.56 246.778C943.266 247.138 943.123 247.6 943.163 248.066C943.613 252.678 943.613 257.323 943.163 261.935C943.137 262.168 943.157 262.405 943.221 262.631C943.286 262.857 943.395 263.068 943.54 263.251C943.686 263.434 943.866 263.586 944.07 263.698C944.274 263.81 944.498 263.879 944.728 263.903C944.959 263.926 945.192 263.903 945.413 263.834C945.635 263.765 945.841 263.652 946.019 263.502C946.197 263.351 946.345 263.166 946.452 262.958C946.559 262.749 946.625 262.521 946.645 262.286C947.118 257.441 947.118 252.56 946.645 247.714ZM939.776 249.522C939.761 249.287 939.7 249.057 939.596 248.846C939.493 248.635 939.349 248.447 939.173 248.293C938.997 248.139 938.793 248.022 938.572 247.949C938.351 247.876 938.118 247.848 937.887 247.867C937.655 247.887 937.43 247.953 937.224 248.061C937.018 248.17 936.835 248.319 936.686 248.5C936.538 248.681 936.426 248.891 936.358 249.116C936.289 249.342 936.266 249.579 936.289 249.813C936.569 253.266 936.569 256.735 936.289 260.187C936.259 260.653 936.41 261.111 936.71 261.465C937.009 261.818 937.434 262.037 937.891 262.076C938.349 262.114 938.803 261.968 939.156 261.669C939.508 261.37 939.731 260.943 939.776 260.479C940.072 256.833 940.072 253.168 939.776 249.522Z" fill="${volumeBarStyle.barColor}"/>

<rect x="377" y="243" width="318" height="25" rx="12.5" fill="${progressBarStyle.barColorDuo ? progressBarStyle.barColor : 'white'}" fill-opacity="0.14"/>
<rect x="377" y="243" width="${progressWidth}" height="25" rx="12.5" fill="${progressBarStyle.barColor}"/>

<rect x="966" y="242" width="160" height="25" rx="12.5" fill="${volumeBarStyle.barColorDuo ? volumeBarStyle.barColor : 'white'}" fill-opacity="0.14"/>
<rect x="966" y="242" width="${volumeWidth}" height="25" rx="12.5" fill="${volumeBarStyle.barColor}"/>

${isExplicit ? `<path fill-rule="evenodd" clip-rule="evenodd" d="M392 154C383.716 154 377 160.716 377 169V184C377 192.284 383.716 199 392 199H407C415.284 199 422 192.284 422 184V169C422 160.716 415.284 154 407 154H392ZM398.407 174.868V170.962H405.53V167.195H393.705V186.5H405.53V182.733H398.407V178.497H404.705V174.868H398.407Z" fill="${explicitColor}" fill-opacity="${explicitOpacity}"/>` : ''}

<defs>
<linearGradient id="paint0_linear_61_14" x1="0" y1="175" x2="1415" y2="175" gradientUnits="userSpaceOnUse">
<stop stop-color="${backgroundColor}" stop-opacity="0"/>
<stop stop-color="${backgroundColor}" offset="0.5" stop-opacity="0.78"/>
<stop stop-color="${backgroundColor}" offset="1"/>
</linearGradient>
</defs>
</svg>`;
};
