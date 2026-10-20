// Recibe los pedidos del catálogo y los guarda en esta hoja de Google
// 1) Crea una hoja de cálculo nueva en Google Drive con la cuenta de la empresa
// 2) Extensiones > Apps Script > pega este código > Guardar
// 3) Implementar > Nueva implementación > Tipo: Aplicación web > Ejecutar como: Yo > Acceso: Cualquier persona > Implementar
// 4) Copia la URL que termina en /exec y pégala en index.html, en CONFIG.endpoint
function doPost(e) {
  var o = JSON.parse(e.postData.contents);
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Pedidos') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Pedidos');
  if (sh.getLastRow() === 0) sh.appendRow(['Pedido', 'Fecha', 'Nombre', 'Teléfono', 'Cédula', 'Zona', 'Dirección', 'Horario', 'Ref.', 'Producto', 'Opción', 'Cantidad', 'Delivery', 'Estatus']);
  o.items.forEach(function (i) {
    sh.appendRow([o.id, o.fecha, o.cliente.nombre, o.cliente.telefono, o.cliente.cedula, o.cliente.zona, o.cliente.direccion, o.cliente.horario, i.sku, i.nombre, i.opcion, i.q, o.delivery, 'Nuevo']);
  });
  return ContentService.createTextOutput('ok');
}
