interface FlyerData {
  Url: string;
}

export const createFlyer = async (data: FlyerData) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/flyer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al crear el flyer');
  }

  return await res.json();
};


export const getFlyers = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/flyer`, {
    method: 'GET',
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Error al obtener el flyer');
  }

  return await res.json();
};


export const updateFlyer = async (formData: any) => {
    console.log('entro a la api', formData)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/flyer`, {
    method: 'PUT',
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Error al actualizar el flyer');
  }

  return await res.json();
};

