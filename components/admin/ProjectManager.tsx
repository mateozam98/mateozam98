"use client";

import { useEffect, useMemo, useState } from "react";

import type { ProjectCategoryKey } from "@/data";
import type { Lang } from "@/lib/i18n";

type ProjectDraft = {
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  link: string;
  image: string;
  categoryKey: ProjectCategoryKey;
  iconLists: string[];
};

type StoredProject = ProjectDraft & {
  id: string;
  createdAt: number;
};

type ProjectManagerProps = {
  lang: Lang;
};

const categoryLabels: Record<Lang, Record<ProjectCategoryKey, string>> = {
  es: {
    all: "Todos",
    development: "Desarrollo",
    data: "Análisis de Datos",
    security: "Ciberseguridad",
  },
  en: {
    all: "All",
    development: "Development",
    data: "Data Analytics",
    security: "Cybersecurity",
  },
};

const copy = {
  es: {
    heading: "Nuevos proyectos",
    helper: "Estos proyectos se guardan en la nube (Blob).",
    add: "Agregar proyecto",
    uploading: "Subiendo...",
    export: "Copiar JSON",
    empty: "No hay proyectos creados aún.",
    fields: {
      titleEs: "Título (ES)",
      titleEn: "Título (EN)",
      descEs: "Descripción (ES)",
      descEn: "Descripción (EN)",
      link: "Link",
      image: "Imagen (ruta /imagen.svg)",
      category: "Categoría",
      tools: "Herramientas",
    },
  },
  en: {
    heading: "New projects",
    helper: "These projects are saved in the cloud (Blob).",
    add: "Add project",
    uploading: "Uploading...",
    export: "Copy JSON",
    empty: "No projects created yet.",
    fields: {
      titleEs: "Title (ES)",
      titleEn: "Title (EN)",
      descEs: "Description (ES)",
      descEn: "Description (EN)",
      link: "Link",
      image: "Image (path /image.svg)",
      category: "Category",
      tools: "Tools",
    },
  },
} as const;

const defaultDraft: ProjectDraft = {
  titleEs: "",
  titleEn: "",
  descEs: "",
  descEn: "",
  link: "",
  image: "",
  categoryKey: "development",
  iconLists: [],
};

const toolOptions = [
  { key: "html", label: "HTML", icon: "/html.svg" },
  { key: "css", label: "CSS", icon: "/css.svg" },
  { key: "js", label: "JavaScript", icon: "/js.svg" },
  { key: "ts", label: "TypeScript", icon: "/ts.svg" },
  { key: "react", label: "React", icon: "/re.svg" },
  { key: "node", label: "Node.js", icon: "/nodejs.svg" },
  { key: "tailwind", label: "Tailwind", icon: "/tail.svg" },
  { key: "sass", label: "Sass", icon: "/sass.svg" },
  { key: "php", label: "PHP", icon: "/php.svg" },
  { key: "python", label: "Python", icon: "/python.svg" },
  { key: "aws", label: "AWS", icon: "/aws.svg" },
  { key: "mongo", label: "MongoDB", icon: "/mongo.svg" },
  { key: "vite", label: "Vite", icon: "/vite.svg" },
  { key: "godot", label: "Godot", icon: "/godot.svg" },
];

export default function ProjectManager({ lang }: ProjectManagerProps) {
  const content = copy[lang];
  const [draft, setDraft] = useState<ProjectDraft>(defaultDraft);
  const [projects, setProjects] = useState<StoredProject[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/projects", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (data?.projects && Array.isArray(data.projects)) {
          const enriched = data.projects.map((item: ProjectDraft & { createdAt?: number }) => ({
            ...item,
            id: crypto.randomUUID(),
            createdAt: item.createdAt ?? Date.now(),
          }));
          setProjects(enriched);
        }
      } catch {
        setProjects([]);
      }
    };
    load();
  }, []);

  const categoryOptions = useMemo(() => {
    const labels = categoryLabels[lang];
    return (Object.keys(labels) as ProjectCategoryKey[])
      .filter((key) => key !== "all")
      .map((key) => ({ key, label: labels[key] }));
  }, [lang]);

  const handleChange = (field: keyof ProjectDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTool = (icon: string) => {
    setDraft((prev) => {
      const exists = prev.iconLists.includes(icon);
      return {
        ...prev,
        iconLists: exists
          ? prev.iconLists.filter((item) => item !== icon)
          : [...prev.iconLists, icon],
      };
    });
  };

  const persistProjects = async (nextProjects: StoredProject[]) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const payload = nextProjects.map(({ id, ...rest }) => rest);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message = data?.error || (lang === "es" ? "Error al guardar" : "Failed to save");
        setSaveMessage(message);
      } else {
        setSaveMessage(
          lang === "es" ? "Guardado en la nube." : "Saved to the cloud.",
        );
      }
    } catch {
      setSaveMessage(lang === "es" ? "Error al guardar" : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const seedProjects = async () => {
    setSeeding(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/projects/seed", { method: "POST" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setSaveMessage(data?.error || "Error al migrar");
      } else {
        setSaveMessage(
          lang === "es"
            ? "Proyectos base migrados."
            : "Base projects migrated.",
        );
        const refreshed = await fetch("/api/projects", { cache: "no-store" });
        const data = await refreshed.json().catch(() => null);
        if (data?.projects && Array.isArray(data.projects)) {
          const enriched = data.projects.map((item: ProjectDraft & { createdAt?: number }) => ({
            ...item,
            id: crypto.randomUUID(),
            createdAt: item.createdAt ?? Date.now(),
          }));
          setProjects(enriched);
        }
      }
    } catch {
      setSaveMessage(lang === "es" ? "Error al migrar" : "Failed to migrate");
    } finally {
      setSeeding(false);
    }
  };

  const addProject = async () => {
    if (!draft.titleEs || !draft.titleEn || !draft.link || !draft.image) return;
    const next = [
      {
        ...draft,
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      },
      ...projects,
    ];
    setProjects(next);
    setDraft(defaultDraft);
    await persistProjects(next);
  };

  const startEdit = (project: StoredProject) => {
    setEditingId(project.id);
    setDraft({
      titleEs: project.titleEs,
      titleEn: project.titleEn,
      descEs: project.descEs,
      descEn: project.descEn,
      link: project.link,
      image: project.image,
      categoryKey: project.categoryKey,
      iconLists: project.iconLists ?? [],
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft(defaultDraft);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    if (!draft.titleEs || !draft.titleEn || !draft.link || !draft.image) return;
    const next = projects.map((item) =>
      item.id === editingId
        ? { ...item, ...draft, createdAt: item.createdAt }
        : item,
    );
    setProjects(next);
    setEditingId(null);
    setDraft(defaultDraft);
    await persistProjects(next);
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(null);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/blob", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        setUploadError(text || "Error al subir la imagen");
        return;
      }

      const data = (await res.json().catch(() => null)) as { url?: string } | null;
      const url = data?.url;
      if (typeof url === "string" && url.length > 0) {
        setDraft((prev) => ({ ...prev, image: url }));
        setUploadSuccess(
          lang === "es" ? "Imagen subida correctamente." : "Image uploaded successfully.",
        );
      } else {
        setUploadError("No se recibió URL de la imagen");
      }
    } catch {
      setUploadError("No se pudo subir la imagen");
    } finally {
      setUploading(false);
    }
  };

  const removeProject = async (id: string) => {
    const next = projects.filter((item) => item.id !== id);
    setProjects(next);
    await persistProjects(next);
  };

  const copyJson = async () => {
    const payload = projects.map(({ id, ...rest }) => rest);
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{content.heading}</h2>
          <p className="text-sm text-white/60">{content.helper}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={seedProjects}
            className="rounded-lg border border-white/20 px-3 py-2 text-xs text-white/80"
            disabled={seeding}
          >
            {lang === "es" ? "Migrar base" : "Migrate base"}
          </button>
          <button
            type="button"
            onClick={copyJson}
            className="rounded-lg border border-white/20 px-3 py-2 text-xs text-white/80"
          >
            {content.export}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-xs text-white/70">{content.fields.titleEs}</label>
          <input
            value={draft.titleEs}
            onChange={(event) => handleChange("titleEs", event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          />

          <label className="text-xs text-white/70">{content.fields.titleEn}</label>
          <input
            value={draft.titleEn}
            onChange={(event) => handleChange("titleEn", event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          />

          <label className="text-xs text-white/70">{content.fields.descEs}</label>
          <textarea
            value={draft.descEs}
            onChange={(event) => handleChange("descEs", event.target.value)}
            className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          />

          <label className="text-xs text-white/70">{content.fields.descEn}</label>
          <textarea
            value={draft.descEn}
            onChange={(event) => handleChange("descEn", event.target.value)}
            className="min-h-[90px] w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-3">
          <label className="text-xs text-white/70">{content.fields.link}</label>
          <input
            value={draft.link}
            onChange={(event) => handleChange("link", event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          />

          <label className="text-xs text-white/70">{content.fields.image}</label>
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) uploadImage(file);
              }}
              className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-xs file:text-white/80"
            />
            {uploadError ? (
              <p className="text-xs text-red-400">{uploadError}</p>
            ) : null}
            {uploadSuccess ? (
              <p className="text-xs text-emerald-400">{uploadSuccess}</p>
            ) : null}
            <input
              value={draft.image}
              onChange={(event) => handleChange("image", event.target.value)}
              className="hidden"
              placeholder="https://..."
            />
          </div>

          <label className="text-xs text-white/70">{content.fields.category}</label>
          <select
            value={draft.categoryKey}
            onChange={(event) => handleChange("categoryKey", event.target.value)}
            className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
          >
            {categoryOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={editingId ? saveEdit : addProject}
            className="mt-2 w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black disabled:opacity-50"
            disabled={uploading || saving}
          >
            {uploading
              ? content.uploading
              : editingId
                ? lang === "es"
                  ? "Guardar cambios"
                  : "Save changes"
                : content.add}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={cancelEdit}
              className="mt-2 w-full rounded-lg border border-white/20 px-3 py-2 text-sm text-white/70"
              disabled={uploading || saving}
            >
              {lang === "es" ? "Cancelar edición" : "Cancel edit"}
            </button>
          ) : null}
          {saveMessage ? (
            <p className="text-xs text-emerald-400">{saveMessage}</p>
          ) : null}
        </div>
      </div>

        <div className="mt-6">
          <label className="text-xs text-white/70">{content.fields.tools}</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {toolOptions.map((tool) => {
              const active = draft.iconLists.includes(tool.icon);
              return (
                <button
                  key={tool.key}
                  type="button"
                  onClick={() => toggleTool(tool.icon)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition ${
                    active
                      ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200"
                      : "border-white/10 text-white/70 hover:border-white/30"
                  }`}
                >
                  <span className="h-5 w-5 rounded-full bg-black/40 p-1">
                    <img src={tool.icon} alt={tool.label} />
                  </span>
                  {tool.label}
                </button>
              );
            })}
          </div>
        </div>

      <div className="mt-6 space-y-3">
        {projects.length === 0 ? (
          <p className="text-sm text-white/60">{content.empty}</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col gap-2 rounded-xl border border-white/10 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-white/90">{project.titleEs}</div>
                <div className="text-xs text-white/60">{project.link}</div>
                {project.iconLists?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.iconLists.map((icon) => (
                      <span
                        key={icon}
                        className="rounded-full border border-white/10 bg-black/40 p-1"
                      >
                        <img src={icon} alt="tool" className="h-4 w-4" />
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(project)}
                  className="rounded-lg border border-white/20 px-3 py-2 text-xs text-white/70"
                >
                  {lang === "es" ? "Editar" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  className="rounded-lg border border-white/20 px-3 py-2 text-xs text-white/70"
                >
                  {lang === "es" ? "Eliminar" : "Delete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
