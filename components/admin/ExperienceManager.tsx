"use client";

import { useEffect, useState } from "react";

import type { Lang } from "@/lib/i18n";

const experienceThumbnails = ["/exp4.svg", "/exp1.svg", "/exp2.svg", "/exp3.svg"] as const;

type ExperienceDraft = {
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  thumbnail: string;
  isCurrent: boolean;
};

type StoredExperience = ExperienceDraft & {
  id: string;
  createdAt: number;
};

type ExperienceManagerProps = {
  lang: Lang;
};

const copy = {
  es: {
    heading: "Nueva experiencia laboral",
    helper: "Estas experiencias se guardan en la nube (Blob).",
    add: "Agregar experiencia",
    upload: "Subiendo...",
    export: "Copiar JSON",
    empty: "No hay experiencias creadas aún.",
    saveOk: "Guardado en la nube.",
    saveFail: "Error al guardar",
    fields: {
      titleEs: "Cargo (ES)",
      titleEn: "Role (EN)",
      descEs: "Descripción (ES)",
      descEn: "Description (EN)",
      thumbnail: "Imagen (ruta /exp.svg o URL)",
      current: "Trabajo actual",
    },
    currentBadge: "Actual",
  },
  en: {
    heading: "New work experience",
    helper: "These experiences are saved in the cloud (Blob).",
    add: "Add experience",
    upload: "Uploading...",
    export: "Copy JSON",
    empty: "No experiences created yet.",
    saveOk: "Saved to the cloud.",
    saveFail: "Failed to save",
    fields: {
      titleEs: "Role (ES)",
      titleEn: "Role (EN)",
      descEs: "Description (ES)",
      descEn: "Description (EN)",
      thumbnail: "Image (path /exp.svg or URL)",
      current: "Current job",
    },
    currentBadge: "Current",
  },
} as const;

const defaultDraft: ExperienceDraft = {
  titleEs: "",
  titleEn: "",
  descEs: "",
  descEn: "",
  thumbnail: experienceThumbnails[0],
  isCurrent: false,
};

const getNextThumbnail = (items: StoredExperience[]) => {
  if (items.length === 0) return experienceThumbnails[0];

  const latest = [...items].sort((a, b) => b.createdAt - a.createdAt)[0];
  const index = experienceThumbnails.indexOf(
    latest.thumbnail as (typeof experienceThumbnails)[number],
  );

  if (index < 0) return experienceThumbnails[0];
  return experienceThumbnails[(index + 1) % experienceThumbnails.length];
};

export default function ExperienceManager({ lang }: ExperienceManagerProps) {
  const content = copy[lang];
  const [draft, setDraft] = useState<ExperienceDraft>(defaultDraft);
  const [experience, setExperience] = useState<StoredExperience[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/experience", { cache: "no-store" });
        const data = await res.json().catch(() => null);
        if (data?.experience && Array.isArray(data.experience)) {
          const enriched = data.experience.map((item: ExperienceDraft & { createdAt?: number }) => ({
            ...item,
            id: crypto.randomUUID(),
            createdAt: item.createdAt ?? Date.now(),
          }));
          setExperience(enriched);
          setDraft((prev) => ({ ...prev, thumbnail: getNextThumbnail(enriched) }));
        }
      } catch {
        setExperience([]);
      }
    };
    load();
  }, []);

  const handleChange = (field: keyof ExperienceDraft, value: string | boolean) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const persistExperience = async (nextExperience: StoredExperience[]) => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const payload = nextExperience.map(({ id, ...rest }) => rest);
      const res = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setSaveMessage(data?.error || content.saveFail);
      } else {
        setSaveMessage(content.saveOk);
      }
    } catch {
      setSaveMessage(content.saveFail);
    } finally {
      setSaving(false);
    }
  };

  const addExperience = async () => {
    if (!draft.titleEs || !draft.titleEn || !draft.descEs || !draft.descEn || !draft.thumbnail) return;
    const next = [
      {
        ...draft,
        thumbnail: getNextThumbnail(experience),
        id: crypto.randomUUID(),
        createdAt: Date.now(),
      },
      ...experience.map((item) =>
        draft.isCurrent ? { ...item, isCurrent: false } : item,
      ),
    ];
    setExperience(next);
    setDraft({ ...defaultDraft, thumbnail: getNextThumbnail(next) });
    await persistExperience(next);
    setShowForm(false);
  };

  const startEdit = (item: StoredExperience) => {
    setEditingId(item.id);
    setShowForm(true);
    setDraft({
      titleEs: item.titleEs,
      titleEn: item.titleEn,
      descEs: item.descEs,
      descEn: item.descEn,
      thumbnail: item.thumbnail,
      isCurrent: item.isCurrent ?? false,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ ...defaultDraft, thumbnail: getNextThumbnail(experience) });
    setShowForm(false);
  };

  const saveEdit = async () => {
    if (!editingId) return;
    if (!draft.titleEs || !draft.titleEn || !draft.descEs || !draft.descEn || !draft.thumbnail) return;
    const next = experience.map((item) =>
      item.id === editingId
        ? { ...item, ...draft, createdAt: item.createdAt }
        : item,
    );
    const normalized = draft.isCurrent
      ? next.map((item) =>
          item.id === editingId ? item : { ...item, isCurrent: false },
        )
      : next;
    setExperience(normalized);
    setEditingId(null);
    setDraft({ ...defaultDraft, thumbnail: getNextThumbnail(normalized) });
    await persistExperience(normalized);
    setShowForm(false);
  };

  const removeExperience = async (id: string) => {
    const next = experience.filter((item) => item.id !== id);
    setExperience(next);
    if (!editingId) {
      setDraft((prev) => ({ ...prev, thumbnail: getNextThumbnail(next) }));
    }
    await persistExperience(next);
  };

  const copyJson = async () => {
    const payload = experience.map(({ id, ...rest }) => rest);
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
  };

  const toggleForm = () => {
    if (editingId) {
      setEditingId(null);
      setDraft({ ...defaultDraft, thumbnail: getNextThumbnail(experience) });
    }
    if (!showForm) {
      setDraft((prev) => ({ ...prev, thumbnail: getNextThumbnail(experience) }));
    }
    setShowForm((prev) => !prev);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{content.heading}</h2>
          <p className="text-sm text-white/60">{content.helper}</p>
        </div>
        <button
          type="button"
          onClick={copyJson}
          className="rounded-lg border border-white/20 px-3 py-2 text-xs text-white/80"
        >
          {content.export}
        </button>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-white/90">
            {lang === "es" ? "Experiencias añadidas" : "Added experiences"}
          </h3>
        </div>

        <div className="space-y-3">
        {experience.length === 0 ? (
          <p className="text-sm text-white/60">{content.empty}</p>
        ) : (
          experience.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border border-white/10 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="text-sm font-semibold text-white/90">{item.titleEs}</div>
                  {item.isCurrent ? (
                    <span className="inline-flex rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-200">
                      {content.currentBadge}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="rounded-lg border border-white/20 px-3 py-2 text-xs text-white/70"
                >
                  {lang === "es" ? "Editar" : "Edit"}
                </button>
                <button
                  type="button"
                  onClick={() => removeExperience(item.id)}
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

      <div className="mt-6 rounded-xl border border-white/10 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-white/90">
            {editingId
              ? lang === "es"
                ? "Editar experiencia"
                : "Edit experience"
              : lang === "es"
                ? "Nueva experiencia"
                : "New experience"}
          </h3>
          <button
            type="button"
            onClick={toggleForm}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl leading-none text-white hover:bg-white/20"
            aria-label={lang === "es" ? "Añadir experiencia" : "Add experience"}
          >
            +
          </button>
        </div>

        {showForm || editingId ? (
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
              <label className="text-xs text-white/70">{content.fields.thumbnail}</label>
              <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white/80">
                {editingId ? draft.thumbnail : getNextThumbnail(experience)}
              </div>
              <p className="text-xs text-white/50">
                {lang === "es"
                  ? "Se asigna automáticamente iniciando en /exp4.svg y luego en ciclo."
                  : "Assigned automatically starting at /exp4.svg and then in cycle."}
              </p>

              <label className="mt-2 flex items-center gap-2 text-xs text-white/70">
                <input
                  type="checkbox"
                  checked={draft.isCurrent}
                  onChange={(event) => handleChange("isCurrent", event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-black/40"
                />
                {content.fields.current}
              </label>
              <button
                type="button"
                onClick={editingId ? saveEdit : addExperience}
                className="mt-2 w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black disabled:opacity-50"
                disabled={saving}
              >
                {editingId
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
                  disabled={saving}
                >
                  {lang === "es" ? "Cancelar edición" : "Cancel edit"}
                </button>
              ) : null}

              {saveMessage ? <p className="text-xs text-emerald-400">{saveMessage}</p> : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
