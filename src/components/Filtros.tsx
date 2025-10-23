import { useTranslation } from 'react-i18next';
import type { FiltrosProps, FiltroEstado, Prioridad, Categoria } from '../types';

function Filtros({ 
  filtroEstado, 
  setFiltroEstado, 
  filtroPrioridad, 
  setFiltroPrioridad,
  filtroCategoria,
  setFiltroCategoria
}: FiltrosProps) {

  const {t} = useTranslation();
  
  return (
    <div className='filtros-contenedor'>
      <h3 className='filtros-titulo'>{t('filters.title')}</h3>
      
      <div className='filtros-grid'>
        <div className='filtro-grupo'>
          <label>{t('filters.state')}</label>
          <div className='filtro-botones'>
            <button
              className={`filtro-boton ${filtroEstado === 'todas' ? 'activo' : ''}`}
              onClick={() => setFiltroEstado('todas' as FiltroEstado)}
            >
              {t('stats.total')}
            </button>
            <button
              className={`filtro-boton ${filtroEstado === 'activas' ? 'activo' : ''}`}
              onClick={() => setFiltroEstado('activas' as FiltroEstado)}
            >
               {t('stats.active')}
            </button>
            <button
              className={`filtro-boton ${filtroEstado === 'completadas' ? 'activo' : ''}`}
              onClick={() => setFiltroEstado('completadas' as FiltroEstado)}
            >
              {t('stats.completed')}
            </button>
          </div>
        </div>

        <div className='filtro-grupo'>
          <label>{t('filters.priority')}</label>
          <select
            className='filtro-select'
            aria-label='Filtrar por prioridad'
            value={filtroPrioridad}
            onChange={(e) => setFiltroPrioridad(e.target.value as Prioridad | 'todas')}
          >
            <option value='todas'>{t('filters.all')}</option>
            <option value='alta'>{t('filters.priority_high')}</option>
            <option value='media'>{t('filters.priority_medium')}</option>
            <option value='baja'>{t('filters.priority_low')}</option>
          </select>
        </div>

        <div className='filtro-grupo'>
          <label>{t('filters.category')}</label>
          <select
            className='filtro-select'
            aria-label='Filtrar por categoria'
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value as Categoria | 'todas')}
          >
            <option value='todas'>{t('filters.all')}</option>
            <option value='personal'>{t('filters.cat_personal')}</option>
            <option value='trabajo'>{t('filters.cat_work')}</option>
            <option value='hogar'>{t('filters.cat_home')}</option>
            <option value='estudio'>{t('filters.cat_study')}</option>
            <option value='otro'>{t('filters.cat_other')}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filtros;