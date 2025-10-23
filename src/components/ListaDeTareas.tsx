import { useState, useEffect } from 'react';
import TareaFormulario from './TareaFormulario';
import Tarea from './Tarea';
import Filtros from './Filtros';
import Estadisticas from './Estadisticas';
import type { ITarea, FiltroEstado, Prioridad, Categoria } from '../types';
import { useTranslation } from 'react-i18next';

function ListaDeTareas() {
  const {t} = useTranslation ();


  const [tareas, setTareas] = useState<ITarea[]>(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  const [tareaEditando, setTareaEditando] = useState<ITarea | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>('todas');
  const [filtroPrioridad, setFiltroPrioridad] = useState<Prioridad | 'todas'>('todas');
  const [filtroCategoria, setFiltroCategoria] = useState<Categoria | 'todas'>('todas');

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (tarea: ITarea): void => {
    if (tarea.titulo.trim()) {
      const tareaLimpia: ITarea = {
        ...tarea,
        titulo: tarea.titulo.trim(),
        descripcion: tarea.descripcion.trim()
      };
      setTareas(prevTareas => [tareaLimpia, ...prevTareas]);
    }
  };

  const eliminarTarea = (id: string): void => {
    setTareas(prevTareas => prevTareas.filter(tarea => tarea.id !== id));
  };

  const completarTarea = (id: string): void => {
    setTareas(prevTareas =>
      prevTareas.map(tarea =>
        tarea.id === id
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      )
    );
  };

  const editarTarea = (tareaActualizada: ITarea): void => {
    setTareas(prevTareas =>
      prevTareas.map(tarea =>
        tarea.id === tareaActualizada.id ? tareaActualizada : tarea
      )
    );
    setTareaEditando(null);
  };

  const iniciarEdicion = (tarea: ITarea): void => {
    setTareaEditando(tarea);
  };

  const cancelarEdicion = (): void => {
    setTareaEditando(null);
  };

  const tareasFiltradas = tareas.filter(tarea => {
    const pasaFiltroEstado = 
      filtroEstado === 'todas' ||
      (filtroEstado === 'completadas' && tarea.completada) ||
      (filtroEstado === 'activas' && !tarea.completada);

    const pasaFiltroPrioridad = 
      filtroPrioridad === 'todas' || tarea.prioridad === filtroPrioridad;

    const pasaFiltroCategoria = 
      filtroCategoria === 'todas' || tarea.categoria === filtroCategoria;

    return pasaFiltroEstado && pasaFiltroPrioridad && pasaFiltroCategoria;
  });

  const tareasCompletadas = tareas.filter(t => t.completada).length;
  const tareasActivas = tareas.length - tareasCompletadas;

  return (
    <>
      <Estadisticas 
        total={tareas.length}
        completadas={tareasCompletadas}
        activas={tareasActivas}
      />

      <TareaFormulario 
        onSubmit={tareaEditando ? editarTarea : agregarTarea}
        tareaEditando={tareaEditando}
        onCancelar={cancelarEdicion}
      />

      <Filtros 
        filtroEstado={filtroEstado}
        setFiltroEstado={setFiltroEstado}
        filtroPrioridad={filtroPrioridad}
        setFiltroPrioridad={setFiltroPrioridad}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
      />

      <div className='tareas-lista-contenedor'>
        {tareasFiltradas.length === 0 ? (
          <p className='tareas-vacio'>
            {tareas.length === 0 
              ? t('list.empty') 
              : t('list.no_matches')}
          </p>
        ) : (
          tareasFiltradas.map((tarea) => (
            <Tarea
              key={tarea.id}
              tarea={tarea}
              completarTarea={completarTarea}
              eliminarTarea={eliminarTarea}
              editarTarea={iniciarEdicion}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ListaDeTareas;