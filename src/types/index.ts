// types.ts - Interfaces TypeScript actualizadas

export type Prioridad = 'alta' | 'media' | 'baja';
export type Categoria = 'personal' | 'trabajo' | 'hogar' | 'estudio' | 'otro';
export type FiltroEstado = 'todas' | 'activas' | 'completadas';

export interface ITarea {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
  prioridad: Prioridad;
  categoria: Categoria;
  fechaCreacion: string;
  fechaVencimiento?: string;
}

export interface TareaFormularioProps {
  onSubmit: (tarea: ITarea) => void;
  tareaEditando?: ITarea | null;
  onCancelar?: () => void;
}

export interface TareaProps {
  tarea: ITarea;
  completarTarea: (id: string) => void;
  eliminarTarea: (id: string) => void;
  editarTarea: (tarea: ITarea) => void;
}

export interface FiltrosProps {
  filtroEstado: FiltroEstado;
  setFiltroEstado: (filtro: FiltroEstado) => void;
  filtroPrioridad: Prioridad | 'todas';
  setFiltroPrioridad: (prioridad: Prioridad | 'todas') => void;
  filtroCategoria: Categoria | 'todas';
  setFiltroCategoria: (categoria: Categoria | 'todas') => void;
}

export interface EstadisticasProps {
  total: number;
  completadas: number;
  activas: number;
}