import { useSelector } from 'react-redux';
import { useDesigner } from './useDesigner';

export function useActivedDocument() {
  const { designer } = useDesigner()
  const document = useSelector(() => designer?.documentModel?.getDocument())
  return { document }
}
