"use client";

import { useState } from "react";
import { useNotesStore } from "@/lib/store/useNotesStore";
import { COUNTRY_BY_CODE } from "@/lib/mock/countries";

export default function NotesPage() {
  const notes = useNotesStore((s) => s.notes);
  const addNote = useNotesStore((s) => s.addNote);
  const removeNote = useNotesStore((s) => s.removeNote);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [query, setQuery] = useState("");

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.bodyMarkdown.toLowerCase().includes(query.toLowerCase()) ||
      n.tags.some((t) => t.includes(query))
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2 rounded-xl border border-black/10 dark:border-white/15 p-4">
        <h2 className="font-semibold">新規メモ</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 text-sm"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Markdownでメモを書く…"
          className="w-full h-28 rounded-lg border border-black/10 dark:border-white/20 bg-transparent p-2 text-sm"
        />
        <button
          onClick={() => {
            if (!title.trim() && !body.trim()) return;
            addNote({ title: title || "無題", bodyMarkdown: body, images: [], tags: [], countryCode: null });
            setTitle("");
            setBody("");
          }}
          className="rounded-lg bg-blue-600 text-white px-4 py-1.5 text-sm"
        >
          保存(自動保存対応予定)
        </button>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索(タイトル・本文・タグ)"
        className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 py-2 text-sm"
      />

      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="text-sm text-black/40">メモがまだありません。</p>
        )}
        {filtered.map((n) => (
          <div key={n.id} className="rounded-xl border border-black/10 dark:border-white/15 p-4 space-y-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold">{n.title}</h3>
              <button onClick={() => removeNote(n.id)} className="text-xs text-red-500">削除</button>
            </div>
            <p className="text-sm whitespace-pre-wrap text-black/70 dark:text-white/70">{n.bodyMarkdown}</p>
            <div className="flex justify-between text-xs text-black/40">
              <span>{n.countryCode ? COUNTRY_BY_CODE[n.countryCode]?.nameJa : "国指定なし"}</span>
              <span>{new Date(n.createdAt).toLocaleString("ja-JP")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
