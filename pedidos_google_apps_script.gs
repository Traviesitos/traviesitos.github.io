// Recibe los pedidos de https://traviesitos.github.io y los guarda en la hoja "Pedidos" de este archivo (Pedidos Traviesitos)
function doPost(e) {
  var lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    var o = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName('Pedidos') || ss.insertSheet('Pedidos', 0);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['Pedido', 'Fecha', 'Teléfono', 'Correo', 'Dirección de envío', 'Promoción', 'Ref.', 'Producto', 'Opción', 'Cantidad', 'Delivery', 'Estatus']);
      sh.getRange(1, 1, 1, 12).setFontWeight('bold').setBackground('#E5007D').setFontColor('#FFFFFF');
      sh.setFrozenRows(1);
    }
    var fecha = Utilities.formatDate(new Date(o.fecha), 'America/Caracas', 'dd/MM/yyyy HH:mm');
    var rows = o.items.map(function (i) {
      return [o.id, fecha, "'" + o.cliente.telefono, o.cliente.correo, o.cliente.direccion, o.promo || '', i.sku, i.nombre, i.opcion || '', i.q, o.delivery, 'Nuevo'];
    });
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, 12).setValues(rows);
    return ContentService.createTextOutput('ok');
  } finally { lock.releaseLock(); }
}
function doGet() { return ContentService.createTextOutput('Pedidos Traviesitos activo'); }
