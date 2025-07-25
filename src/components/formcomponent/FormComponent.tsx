import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, getUserByTelefono } from '../../api/formApi';
import { toast } from 'react-toastify';

interface FormData {
  nombre: string;
  telefono: string;
  lada: string;
  correo: string;
}

export default function FormComponent() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    telefono: '',
    lada: '+52',
    correo: '',
  });

  const [isExistingUser, setIsExistingUser] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [isTicket, setTicket] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (formData.telefono.trim() !== '') {
      const fetchProduct = async () => {
        try {
          const data = await getUserByTelefono(formData.telefono);
          setFormData({
            nombre: data.Name,
            telefono: data.Phone,
            lada: data.Pais,
            correo: data.Email
          });
          setIsChecked(data.Termsandconditions);
          setIsExistingUser(true);
        } catch (error) {
          setFormData({
            nombre: '',
            telefono: formData.telefono,
            lada: '+52',
            correo: ''
          });
          setIsChecked(false);
          setIsExistingUser(false);
          console.error("Error cargando usuario:", error);
        }
      };

      fetchProduct();
    }else{
      setIsExistingUser(true)
    }
  }, [formData.telefono]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createUser,
    onError: (error) => {
        toast.error(`${error.message}`, {
        position: "top-right",
        });
    },
    onSuccess: (data) => {
      const mensaje = data.message || "Registro exitoso";

      toast.success(mensaje, {
        position: "top-right",
        progressClassName: "custom-progress",
         icon: false,
      });

      setFormData({ nombre: '', telefono: '', lada: '+52', correo: '' });
      setIsChecked(false);
      setTicket('');

      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newuser = {
      Name: formData.nombre,
      Phone: formData.telefono,
      Pais: formData.lada,
      Email: formData.correo,
      Termsandconditions: isChecked,
      Ticket: isTicket
    };

    mutate(newuser);
  };

  const isFormValid =
    formData.nombre.trim() !== '' &&
    formData.correo.trim() !== '' &&
    formData.telefono.trim() !== '' &&
    formData.lada.trim() !== '' &&
    isTicket.trim() !== '' &&
    isChecked;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow"
    >
      <h2 className="text-xl font-bold mb-6 text-center text-red-600">
        Registro de Visita
      </h2>

      {/* Ticket */}
      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-500"># Ticket</span>
        <input
          type="text"
          name="ticket"
          placeholder="0000000000000000000000000"
          minLength={25}
          maxLength={25}
          value={isTicket}
          onChange={(e) => {
            const soloNumeros = e.target.value.replace(/\D/g, ''); // Elimina todo lo que no sea número
            setTicket(soloNumeros);
          }}
          required
          className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-red-500 focus:border-red-500"
        />
      </label>

      {/* Teléfono */}
      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-500">Teléfono</span>
        <div className="flex gap-2">
          <select
            name="lada"
            value={formData.lada}
            onChange={handleChange}
            className="w-1/3 border border-gray-300 rounded-md shadow-sm px-3 py-2 text-gray-700"
            required
          >
            <option value="">País</option>
            <option value="+52">🇲🇽 +52 MX</option>
            <option value="+1">🇺🇸 +1 US</option>
            <option value="+57">🇨🇴 +57 CO</option>
            <option value="+34">🇪🇸 +34 ES</option>
          </select>
          <input
            type="tel"
            name="telefono"
            placeholder="Ej: 6644567890"
            minLength={10}
            maxLength={10}
            value={formData.telefono}
            onChange={(e) => {
              const soloNumeros = e.target.value.replace(/\D/g, ''); // elimina letras, símbolos, espacios
              e.target.value = soloNumeros;
              handleChange(e); // sigue usando tu función original
            }}
            required
            className="w-2/3 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </label>

      {/* Nombre */}
      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-500">Nombre completo</span>
        <input
          type="text"
          name="nombre"
          maxLength={254}
          disabled={isExistingUser}
          placeholder="Ej: Juan Carlos Rodríguez López"
          value={formData.nombre}
          onChange={(e) => {
            const soloLetras = e.target.value.replace(/[^a-zA-ZÁÉÍÓÚÑáéíóúñ\s]/g, '');
            e.target.value = soloLetras;
            handleChange(e);
          }}
          required
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm border 
            focus:ring-red-500 focus:border-red-500 
            ${isExistingUser
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
              : 'bg-white text-black border-gray-300'}`}
        />
      </label>

      {/* Correo */}
      <label className="block mb-6">
        <span className="block text-sm font-medium text-gray-500">Correo electrónico</span>
        <input
          type="email"
          name="correo"
          maxLength={254}
          disabled={isExistingUser}
          placeholder="Ejemplo@correo.com"
          value={formData.correo}
          onChange={handleChange}
          required
          className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm border 
          focus:ring-red-500 focus:border-red-500 
          ${isExistingUser
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
            : 'bg-white text-black border-gray-300'}`}
        />
      </label>

      {/* Checkbox */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          id="confidentiality"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
        />
        <label htmlFor="confidentiality" className="text-sm text-gray-700">
          Acepto los{' '}
          <a
            href="/politica-privacidad"
            className="underline text-red-600 hover:text-red-800"
          >
            términos y condiciones de confidencialidad
          </a>.
        </label>
      </div>

      {/* Botón */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full ${
          isFormValid ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'
        } text-white font-medium py-2 px-4 rounded-lg`}
      >
        Registrar Visita
      </button>
    </form>
  );
}
