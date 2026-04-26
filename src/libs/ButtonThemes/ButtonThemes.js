import Button from '@mui/material/Button';
const style={
  fontSize: '15px',
  padding: '8px 30px',
  borderRadius: '6px',
  textTransform: 'capitalize',
  transition: 'background-color 0.3s ease',
}

export default function ButtonThemes({clr,typ,name,disabled,funcname,...props}) {
  return (
      <Button variant={clr} type={typ} disabled={disabled} onClick={funcname} {...props} style={style}>{name}</Button>
  );
}
