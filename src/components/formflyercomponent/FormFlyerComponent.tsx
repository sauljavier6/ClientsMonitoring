// src/components/FlyerUploadForm.tsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { getFlyers, updateFlyer } from '../../api/flyerApi'
import { toast } from 'react-toastify'

export default function FormFlyerComponent() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null
    setFile(selected)
    if (selected) {
      setPreview(URL.createObjectURL(selected))
    }
  }

  const { data } = useQuery({
    queryKey: ['flyer'],
    queryFn: getFlyers,
  });

  useEffect(() => {
    if (data) {
      setPreview(data.Url)
    }
  }, [data]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateFlyer,
    onError: (error) => {
        toast.error(`${error.message}`, {
        position: "top-right",
        });
    },
    onSuccess: () => {
        toast.success("Flyer registrado con éxito", {
        position: "top-right",
        progressClassName: "custom-progress",
        });
        queryClient.invalidateQueries({ queryKey: ['flyer'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Selecciona una imagen.');

    const formData = new FormData();
    formData.append('image', file);

    mutate(formData);
  }

  const getImageSrc = (preview: string) => {
    if (!preview) return '';
    
    if (preview.startsWith('blob:') || preview.startsWith('http://') || preview.startsWith('https://')) {
      return preview;
    }

    return `${import.meta.env.VITE_MEDIA_URL}${preview}`;
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-xl shadow-md bg-white mt-10">
      <h2 className="text-lg font-semibold mb-4 text-center text-red-600">Subir nuevo flyer</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block w-full"
      />

      {preview && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
          <img src={getImageSrc(preview)} alt="Preview" className="rounded-lg shadow" />
        </div>
      )}


      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
      >
        Subir Flyer
      </button>
    </form>
  )
}