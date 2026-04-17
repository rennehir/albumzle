export type ThemeOption = {
  name: string;
  label: string;
  /**
   * Daisy color class
   */
  preview: string;
};

export const themeGroups: Record<string, ThemeOption[]> = {
  Light: [
    { name: "light", label: "Light", preview: "bg-primary" },
    { name: "cupcake", label: "Cupcake", preview: "bg-pink-300" },
    { name: "pastel", label: "Pastel", preview: "bg-green-300" },
    { name: "garden", label: "Garden", preview: "bg-green-500" },
    { name: "winter", label: "Winter", preview: "bg-blue-300" },
  ],

  Dark: [
    { name: "dark", label: "Dark", preview: "bg-neutral" },
    { name: "forest", label: "Forest", preview: "bg-green-800" },
    { name: "dracula", label: "Dracula", preview: "bg-purple-700" },
    { name: "night", label: "Night", preview: "bg-slate-800" },
    { name: "black", label: "Black", preview: "bg-black" },
  ],

  Fun: [
    { name: "synthwave", label: "Synthwave", preview: "bg-pink-500" },
    { name: "cyberpunk", label: "Cyberpunk", preview: "bg-yellow-400" },
    { name: "retro", label: "Retro", preview: "bg-orange-400" },
    { name: "valentine", label: "Valentine", preview: "bg-red-400" },
    { name: "halloween", label: "Halloween", preview: "bg-orange-700" },
  ],

  Clean: [
    { name: "corporate", label: "Corporate", preview: "bg-blue-600" },
    { name: "business", label: "Business", preview: "bg-gray-700" },
    { name: "wireframe", label: "Wireframe", preview: "bg-gray-400" },
    { name: "lofi", label: "Lo-fi", preview: "bg-gray-500" },
  ],
};
