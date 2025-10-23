import { useState, useEffect } from 'react';
import type {FormEvent, ChangeEvent} from "react";
import { v4 as uuidv4 } from 'uuid';
import type { TareaFormularioProps, ITarea, Prioridad, Categoria } from '../types';
import { useTranslation } from 'react-i18next';

function TareaFormulario({ onSubmit, tareaEditando, onCancelar }: TareaFormularioProps) {
  const [titulo, setTitulo] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [prioridad, setPrioridad] = useState<Prioridad>('media');
  const [categoria, setCategoria] = useState<Categoria>('personal');
  const [fechaVencimiento, setFechaVencimiento] = useState<string>('');

  const {t} = useTranslation();

  useEffect(() => {
    if (tareaEditando) {
      setTitulo(tareaEditando.titulo);
      setDescripcion(tareaEditando.descripcion);
      setPrioridad(tareaEditando.prioridad);
      setCategoria(tareaEditando.categoria);
      setFechaVencimiento(tareaEditando.fechaVencimiento || '');
    }
  }, [tareaEditando]);

  const limpiarFormulario = (): void => {
    setTitulo('');
    setDescripcion('');
    setPrioridad('media');
    setCategoria('personal');
    setFechaVencimiento('');
  };

  const manejarEnvio = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!titulo.trim()) {
      return;
    }

    const tarea: ITarea = tareaEditando 
      ? {
          ...tareaEditando,
          titulo,
          descripcion,
          prioridad,
          categoria,
          fechaVencimiento: fechaVencimiento || undefined
        }
      : {
          id: uuidv4(),
          titulo,
          descripcion,
          completada: false,
          prioridad,
          categoria,
          fechaCreacion: new Date().toISOString(),
          fechaVencimiento: fechaVencimiento || undefined
        };

    onSubmit(tarea);
    limpiarFormulario();
  };

  const manejarCancelar = (): void => {
    limpiarFormulario();
    if (onCancelar) {
      onCancelar();
    }
  };

  return (
    <form className='tarea-formulario' onSubmit={manejarEnvio}>
      <div className='formulario-titulo'>
        {tareaEditando ? t('form.title_edit') : t('form.title_new')}
      </div>

      <input
        className='tarea-input'
        type='text'
        placeholder={t('form.input_title')}
        value={titulo}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
        maxLength={100}
        required
      />

      <textarea
        className='tarea-textarea'
        placeholder={t('form.input_description')}
        value={descripcion}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescripcion(e.target.value)}
        maxLength={500}
        rows={3}
      />

      <div className='formulario-grid'>
        <div className='formulario-campo'>
          <label>{t('form.input_priority')}</label>
          <select
            className='tarea-select'
            aria-label='Prioridad'
            value={prioridad}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setPrioridad(e.target.value as Prioridad)}
          >
            <option value='baja'>{t('filters.priority_low')}</option>
            <option value='media'>{t('filters.priority_medium')}</option>
            <option value='alta'>{t('filters.priority_high')}</option>
          </select>
        </div>

        <div className='formulario-campo'>
          <label>{t('form.input_category')}</label>
          <select
            className='tarea-select'
            aria-label='Categoria'
            value={categoria}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCategoria(e.target.value as Categoria)}
          >
            <option value='personal'>{t('filters.cat_personal')}</option>
            <option value='trabajo'>{t('filters.cat_work')}</option>
            <option value='hogar'>{t('filters.cat_home')}</option>
            <option value='estudio'>{t('filters.cat_study')}</option>
            <option value='otro'>{t('filters.cat_other')}</option>
          </select>
        </div>

        <div className='formulario-campo'>
          <label>{t('form.input_date')}</label>
          <input
            className='tarea-input'
            placeholder='Fecha limite'
            type='date'
            value={fechaVencimiento}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFechaVencimiento(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className='formulario-botones'>
        <button className='tarea-boton' type='submit'>
          {tareaEditando ?  t('form.btn_save') : t('form.btn_add')}
        </button>
        {tareaEditando && (
          <button 
            className='tarea-boton-cancelar' 
            type='button'
            onClick={manejarCancelar}
          >
            {t('form.btn_cancel')}
          </button>
        )}
      </div>
    </form>
  );
}

export default TareaFormulario;