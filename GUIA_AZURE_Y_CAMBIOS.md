# Portafolio Alejandro — versión con CV, foto y contacto (octubre 2026)

## Novedades
- Fotografía profesional original extraída del CV y guardada en `assets/alejandro-perfil.jpg`. Referencia desde el HTML: `src="assets/alejandro-perfil.jpg"`.
- Tarjeta lateral con fotografía, celular público `+51 991 852 642`, Lurín (sin domicilio completo), inglés básico III y disponibilidad inmediata.
- Actualización de las secciones Sobre mí, Experiencia, Habilidades, Educación y Contacto con la información del CV proporcionado.
- Información de Power BI/DAX, Python, reducción de tiempos **según los datos declarados en el CV**. Las cifras no tienen verificación de fuente externa.
- Credenciales con enlaces de Credly y Microsoft Learn e integración de LinkedIn de la versión anterior conservadas.

## Seguridad y privacidad
- Se incluye **una copia pública** del CV en `assets/CV_Alejandro_Zuniga_Publico.pdf`, elaborada a partir del PDF enviado: se han quitado el DNI y la dirección residencial detallada. **El PDF original no se incluye en el proyecto.**
- El número celular solicitado es público en esta versión; podrá ser recolectado por visitantes y rastreadores. Para ocultarlo, borrar los enlaces `tel:` y el texto del HTML.
- No hay cambios publicados automáticamente en GitHub ni Azure; el ZIP debe cargarse mediante Git.

## Prueba en tu equipo
1. Extraer el ZIP completo sin cambiar la estructura de carpetas.
2. Abrir `Portafolio_Alejandro/index.html` en el navegador (o VS Code > Live Server).
3. Confirmar que la imagen, los archivos CSS y JavaScript y las insignias se muestran correctamente.
4. Verificar los botones Correo, LinkedIn, GitHub y credenciales. Los enlaces externos requieren conexión a Internet.

## Si se publica en GitHub Pages
- Confirmar que `index.html`, `script.js`, `styles.css` y toda la carpeta `assets/` están en la **raíz** del repositorio configurado en Pages.
- Verificar que `assets/alejandro-perfil.jpg` aparece en GitHub y respeta mayúsculas/minúsculas.
- El HTML usa **rutas relativas**, válidas para GitHub Pages, Azure Static Web Apps y vista local. No utilizar rutas `C:\\...` o `file://...`.
- Probar en una rama de revisión antes de fusionar a `main`.

## En Azure Static Web Apps
- `app_location: /`
- `api_location:` vacío
- `output_location:` vacío
- La aplicación es estática: HTML, CSS y JavaScript, sin compilación.
- Comprobar que se sube la **carpeta `assets/`**.
- La aplicación se puede publicar con el despliegue de GitHub Actions creado desde Azure Static Web Apps.

## Mejoras que requieren más datos
1. Proyectos: enlaces individuales y capturas de pantalla, sin divulgar información confidencial.
2. CV público: PDF editado para quitar DNI y domicilio preciso.
3. Metadatos Open Graph para compartir con una miniatura de vista previa, cuando se defina la URL definitiva.
4. Validación de indicadores con metodología e información anonimizada.

## Nota sobre validación
Se probaron estructura, ruta local, imagen cargada y presentación responsive con Chromium y CSS/JavaScript incrustados en un banco local de pruebas. **No se ha probado aún una publicación real en Azure ni se verificó el funcionamiento externo de los enlaces personales.**


## Nuevo: botón «Descargar CV» (antes del despliegue Azure)
- Botón en el encabezado principal y botón secundario en la sección Contacto.
- El PDF se encuentra en `assets/CV_Alejandro_Zuniga_Publico.pdf` y se sirve con ruta relativa. No necesita base de datos, servidor API ni enlaces de almacenamiento externo.
- Al pulsar, el navegador deberá descargar `CV_Alejandro_Zuniga_2026.pdf` desde GitHub Pages o Azure Static Web Apps. Algunos navegadores pueden abrir una previsualización si no admiten el atributo HTML `download`.
- El PDF público conserva la información profesional y la fotografía del documento original. Se quitaron el número de DNI y la dirección residencial precisa; el celular y el correo profesional permanecen públicos, conforme a lo solicitado.
- Si reemplazas el PDF por una versión nueva, conserva el nombre de archivo o actualiza ambas rutas del HTML.
- Antes de publicar, confirma que la información y fechas laborales siguen vigentes y que te parece apropiado hacer público el celular.
- Para comprobar localmente: abrir `index.html` con Live Server de VS Code y pulsar «Descargar CV»; verificar que el PDF se abre y que no contiene los datos retirados.
