"use client";

import React, { useEffect, useState } from "react";
import { ServiceItem } from "@/lib/types";
import { ChevronDown, Loader2 } from "lucide-react";
import ServiceDrawer from "./ServiceDrawer";
import toast from "react-hot-toast";

import {
  addService,
  updateService,
  deleteServiceDB,
  updateServiceOrder,
} from "./action";
import { ServiceFormType } from "@/lib/validations/service";
import { toBackendService } from "@/lib/utils";

type ManageServicesProps = {
  initialServices: ServiceItem[];
};

export default function ManageServices({
  initialServices,
}: ManageServicesProps) {
  // ----------------------------
  // LOCAL STATE (source of truth)
  // ----------------------------
  const [services, setServices] = useState<ServiceItem[]>(initialServices);

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  );

  const [isCreating, setIsCreating] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  // ----------------------------
  // DRAWER
  // ----------------------------
  const openEdit = (service: ServiceItem) => {
    setSelectedService(service);
    setIsCreating(false);
  };

  const openCreate = () => {
    setSelectedService(null);
    setIsCreating(true);
  };

  const closeDrawer = () => {
    setSelectedService(null);
    setIsCreating(false);
  };

  // ----------------------------
  // ESC LOCK
  // ----------------------------
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };

    window.addEventListener("keydown", handleEsc);

    document.body.style.overflow =
      selectedService || isCreating ? "hidden" : "";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [selectedService, isCreating]);

  // ----------------------------
  // ADD / UPDATE
  // ----------------------------
  const saveService = async (data: ServiceFormType) => {
    const backendPayload = { ...toBackendService(data) };
    try {
      if (isCreating) {
        const res = await addService(backendPayload);

        if (!res.success) throw new Error(res.message);

        setServices((prev) => [res.newService, ...prev]);
        toast.success("Service added");
      } else {
        if (!selectedService) {
          toast.error("No service selected");
          return;
        }

        const res = await updateService(selectedService._id, backendPayload);

        if (!res.success) throw new Error(res.message);

        setServices((prev) =>
          prev.map((s) => (s._id === selectedService._id ? res.updated : s)),
        );

        toast.success("Service updated");
      }

      closeDrawer();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  // ----------------------------
  // DELETE
  // ----------------------------
  const deleteService = async (id: string) => {
    if (loadingId) return;
    try {
      setLoadingId(id);

      const res = await deleteServiceDB(id);

      if (!res.success) throw new Error(res.message);

      setServices((prev) => prev.filter((s) => s._id !== id));

      toast.success("Service deleted");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  // ----------------------------
  // ORDER UPDATE (simple inline)
  // ----------------------------
  const updateOrder = async (id: string, order: number) => {
    try {
      const res = await updateServiceOrder(id, order);

      if (!res.success) throw new Error(res.message);
      toast.success("Order Updated");
      setServices((prev) => prev.map((s) => (s._id === id ? res.updated : s)));
    } catch (err) {
      console.log(err);
      toast.error("Failed to update order");
    }
  };

  const filteredServices = services.filter((service) => {
    const matchSearch =
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "all" ? true : service.category === category;

    return matchSearch && matchCategory;
  });

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <>
      {/* HEADER */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark">
            Services
          </h2>
          <p className="text-sm text-gray-500">Manage your services</p>
        </div>

        <button
          onClick={openCreate}
          className="ml-auto px-4 py-2 bg-primary text-white rounded-md"
        >
          + Add Service
        </button>
      </div>
      <div className="flex flex-wrap gap-3 mb-4">
        {/* SEARCH */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
          className="border px-3 py-2 rounded-md w-full sm:w-64"
        />

        {/* CATEGORY FILTER */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="all">All</option>
          <option value="seo">SEO</option>
          <option value="web">Web</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      {/* LIST */}
      <div className="p-3 sm:p-5 bg-white rounded-2xl border-border">
        {filteredServices.map((service, index) => (
          <details key={service._id} className="border-b py-4">
            <summary className="flex flex-wrap gap-3 px-4 sm:px-6 py-4 cursor-pointer">
              <div className="flex gap-3">
                <span>{index + 1}.</span>
                <h3 className="font-semibold">{service.title}</h3>
              </div>

              <div className="flex items-center ml-auto gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    openEdit(service);
                  }}
                  className="px-3 py-1 border rounded"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteService(service._id);
                  }}
                  className="px-3 py-1 border text-red-500 rounded"
                >
                  {loadingId === service._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Delete"
                  )}
                </button>
                <ChevronDown className="transition-transform duration-200 group-open:rotate-180" />
              </div>
            </summary>

            <div className="mt-3 text-sm text-gray-600">
              <p>{service.shortDescription}</p>
              <p className="mt-1">{service.overview}</p>

              {/* ORDER */}
              <div className="mt-3 flex items-center gap-2">
                <span>Order:</span>
                <input
                  type="number"
                  defaultValue={service.order ?? 0}
                  onBlur={(e) =>
                    updateOrder(service._id, Number(e.target.value))
                  }
                  className="border px-2 py-1 w-20"
                />
              </div>

              {/* FEATURES */}
              <ul className="mt-3 space-y-2">
                {service.features.map((f, i) => (
                  <li key={i}>
                    <div className="font-medium">{f.title}</div>
                    <div className="text-xs text-gray-500">{f.description}</div>
                  </li>
                ))}
              </ul>

              {/* TECH */}
              <div className="flex flex-wrap gap-2 mt-3">
                {service.technologies.map((t, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-gray-100">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>

      {/* DRAWER */}
      {(selectedService || isCreating) && (
        <ServiceDrawer
          service={selectedService}
          onClose={closeDrawer}
          onSave={saveService}
        />
      )}
    </>
  );
}
