import type { TareaProps } from '../types';
import { AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

function Tarea({ tarea, completarTarea, eliminarTarea, editarTarea }: TareaProps) {

  const {t} = useTranslation();

  const { id, titulo, descripcion, completada, prioridad, categoria, fechaCreacion, fechaVencimiento } = tarea;

  const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const mapPrioridad = {
  alta: 'high',
  media: 'medium',
  baja: 'low'
} as const;

const mapCategoria = {
  personal: 'personal',
  trabajo: 'work',
  hogar: 'home',
  estudio: 'study',
  otro: 'other'
} as const;


  const estaVencida = (): boolean => {
    if (!fechaVencimiento || completada) return false;
    return new Date(fechaVencimiento) < new Date();
  };

  const obtenerIconoCategoria = (): string => {
    const iconos: Record<string, string> = {
      personal: '👤',
      trabajo: '💼',
      hogar: '🏠',
      estudio: '📚',
      otro: '📌'
    };
    return iconos[categoria] || '📌';
  };

  const obtenerIconoPrioridad = (): string => {
    const iconos: Record<string, string> = {
      alta: '🔴',
      media: '🟡',
      baja: '🟢'
    };
    return iconos[prioridad];
  };

  const handleCompletar = (): void => {
    completarTarea(id);
  };

  const handleEliminar = (e: React.MouseEvent): void => {
    e.stopPropagation();
    if (window.confirm(t('task.delete_confirm'))) {
      eliminarTarea(id);
    }
  };

  const handleEditar = (e: React.MouseEvent): void => {
    e.stopPropagation();
    editarTarea(tarea);
  };

  return (
    <div
      className={`tarea-contenedor ${completada ? 'completada' : ''} ${estaVencida() ? 'vencida' : ''} prioridad-${prioridad}`}
    >
      <div className='tarea-check' onClick={handleCompletar}>
        <div className={`checkbox ${completada ? 'checked' : ''}`}>
          {completada && '✓'}
        </div>
      </div>

      <div className='tarea-contenido'>
        <div className='tarea-header'>
          <h3 className='tarea-titulo'>{titulo}</h3>
          <div className='tarea-badges'>
            <span className='badge-prioridad' title={`${t('task.priority')}: ${t(`filters.priority_${mapPrioridad[prioridad]}`)}`}>
              {obtenerIconoPrioridad()}
            </span>
            <span className='badge-categoria' title={t(`filters.cat_${mapCategoria[categoria]}`)}>
              {obtenerIconoCategoria()}
            </span>
          </div>
        </div>

        {descripcion && (
          <p className='tarea-descripcion'>{descripcion}</p>
        )}

        <div className='tarea-footer'>
          <span className='tarea-fecha' title={t('task.creation_date')}>
            📅 {formatearFecha(fechaCreacion)}
          </span>
          {fechaVencimiento && (
            <span className={`tarea-vencimiento ${estaVencida() ? 'vencida-texto' : ''}`}>
              ⏰ {formatearFecha(fechaVencimiento)}
            </span>
          )}
        </div>
      </div>

      <div className='tarea-acciones'>
        <button 
          className='tarea-boton-accion editar'
          onClick={handleEditar}
          title={t('task.edit')}
        >
          <AiOutlineEdit />
        </button>
        <button 
          className='tarea-boton-accion eliminar'
          onClick={handleEliminar}
          title={t('task.delete')}
        >
          <AiOutlineCloseCircle />
        </button>
      </div>
    </div>
  );
}

export default Tarea;