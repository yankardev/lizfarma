import { useState, useMemo } from "react"
import { ventanaproductos as DATA } from "../data/ventanaproductos"
import "../styles/productos.css"

function stringOrEmpty(val) {
  return (typeof val === "string") ? val : "";
}
function srcOrPlaceholder(val) {
  return (typeof val === "string" && val.length > 0)
    ? val
    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7801.804759762363!2d-77.04132997679143!3d-12.118831465091956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c83d4916d2fd%3A0x89713b85ad51ab1c!2sBoticas%20y%20Salud%20-%20Miraflores%201!5e0!3m2!1ses-419!2spe!4v1756070160446!5m2!1ses-419!2spe";
}
function numberOrZero(val) {
  const n = (typeof val === "number") ? val : parseFloat(val)
  return Number.isFinite(n) ? n : 0
}
function ProductoTarjeta({ p, onAdd }) {
  const stock = numberOrZero(p.stock)
  const disponible = stock > 0
  const src = srcOrPlaceholder(p.imagen)
  const precio = numberOrZero(p.precio)
  const nombre = stringOrEmpty(p.nombre)
  const categoria = stringOrEmpty(p.categoria)
  const badgeClass = disponible ? "prodBadge prodBadgeOk" : "prodBadge prodBadgeBad"
  return (
    <article className="producto">
      <div className="productoImagen">
        <img src={src} alt={nombre} className="imagenProducto" loading="lazy" />
      </div>
      <div className="cuerpoProducto">
        <h3 className="tituloProducto">{nombre}</h3>
        <p className="parrafoProducto">{categoria}</p>
        <div className="precioFila">
          <span className="precioProducto">S/. {precio.toFixed(2)}</span>
          <span className={badgeClass}>
            {disponible ? "Stock: " + stock : "Sin stock"}
          </span>
        </div>
        <button type="button" className="btnAgregar" disabled={!disponible} onClick={() => onAdd && onAdd(p)} aria-label={`Agregar ${nombre} al carrito`} title={disponible ? "Agregar al carrito" : "Sin stock"}>Agregar al carrito</button>
      </div>
    </article>
  )
}
export default function Productos() {
  const [q, setQ] = useState("");
  const [carrito, setCarrito] = useState([])

  const lista = useMemo(() => {
    const qLower = q.toLowerCase()
    return DATA.filter((p) => {
      const nombre = stringOrEmpty(p.nombre).toLowerCase()
      const categoria = stringOrEmpty(p.categoria).toLowerCase()
      return nombre.includes(qLower) || categoria.includes(qLower)
    })
  }, [q])

  const handleAdd = (prod) => {
    setCarrito((prev) => [...prev, prod])
  }

  return (
    <section className="productosPagina">
      <div className="productosHero">
        <div className="productosHeroInner">
          <h1 className="productosTitulo">Productos</h1>
          <p className="productosSubtitulo">Catálogo de Productos LIZFARMA</p>
        </div>
      </div>

      <div className="productosConteiner">
        <div className="productosFiltros">
          <div className="campoFiltro">
            <label htmlFor="buscador" className="etiquetaFiltro">Buscar</label>
            <input
              id="buscador" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Busca tu producto" className="inputBuscar"
            />
          </div>
          <div className="carritoBadge" role="status" aria-live="polite" title="Productos en el carrito">
            🛒 <strong>{carrito.length}</strong>
          </div>
        </div>
      </div>
      <div className="cuadriculaProductos">
        {lista.map((p, idx) => {
          const key = (typeof p.id === "string" && p.id.length > 0) ? p.id : ("prod-" + idx);
          return <ProductoTarjeta key={key} p={p} onAdd={handleAdd} />
        })}
      </div>

      {lista.length === 0 && (
        <div className="productosVacio">No se encontraron productos.</div>
      )}
    </section>
  )
}
