"use client";

import React, { useState } from "react";
import GlassCard from "@/app/components/GlassCard";
import { statSchema } from "@/lib/validations/stat";
import toast from "react-hot-toast";
import z from "zod";
import { StatItem } from "@/lib/types";
import { updateStat } from "./action";

const ManageStats = ({ statsData }: { statsData: StatItem[] }) => {
  const [stats, setStats] = useState<StatItem[]>(statsData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempStat, setTempStat] = useState<StatItem | null>(null);

  const startEdit = (stat: StatItem) => {
    setEditingId(stat._id);
    setTempStat({ ...stat });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTempStat(null);
  };

  const saveEdit = async () => {
    if (!tempStat) return;
    const { _id, ...rest } = tempStat;
    const parsed = statSchema.safeParse(rest);

    if (!parsed.success) {
      const tree = z.treeifyError(parsed.error);

      const messages: string[] = [];

      if (tree.properties) {
        Object.values(tree.properties).forEach((field) => {
          if (field?.errors) {
            messages.push(...field.errors);
          }
        });
      }

      toast.error(messages.join(", ") || "Invalid data");
      return;
    } else {
      const res = await updateStat(tempStat);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      setStats((prev) =>
        prev.map((s) => (s._id === tempStat._id ? tempStat : s)),
      );
    }

    cancelEdit();
  };

  const handleChange = (field: keyof StatItem, value: string) => {
    if (!tempStat) return;

    setTempStat({
      ...tempStat,
      [field]: field === "value" ? Number(value) : value,
    });
  };

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const isEditing = editingId === stat._id;

          return (
            <GlassCard
              key={stat._id}
              className="flex flex-col items-center justify-center text-center p-6"
            >
              {isEditing && tempStat ? (
                <>
                  {/* Editable Value */}
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="number"
                      value={tempStat.value}
                      onChange={(e) => handleChange("value", e.target.value)}
                      className="w-20 text-center text-3xl font-bold border rounded-md"
                    />
                    <input
                      type="text"
                      value={tempStat.suffix}
                      onChange={(e) => handleChange("suffix", e.target.value)}
                      className="w-10 text-center text-xl border rounded-md"
                    />
                  </div>

                  {/* Editable Label */}
                  <input
                    type="text"
                    value={tempStat.label}
                    onChange={(e) => handleChange("label", e.target.value)}
                    className="text-center text-sm border rounded-md px-2 py-1 w-full mb-4"
                  />

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 text-sm bg-primary text-white rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1 text-sm border rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Value */}
                  <h3 className="text-4xl font-extrabold text-primary mb-2">
                    {stat?.value}
                    {stat?.suffix}
                  </h3>

                  {/* Label */}
                  <p className="text-gray-600 text-sm uppercase tracking-wide mb-4">
                    {stat?.label}
                  </p>

                  {/* Edit Button */}
                  <button
                    onClick={() => startEdit(stat)}
                    className="text-sm text-primary border border-primary px-3 py-1 rounded-md hover:bg-primary hover:text-white transition"
                  >
                    Edit
                  </button>
                </>
              )}
            </GlassCard>
          );
        })}
      </div>
    </>
  );
};

export default ManageStats;
