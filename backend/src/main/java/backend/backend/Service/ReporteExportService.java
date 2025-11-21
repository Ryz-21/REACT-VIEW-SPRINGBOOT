package backend.backend.Service;

import java.io.ByteArrayInputStream;
import  java.io.ByteArrayOutputStream;
import java.util.List;

import org.springframework.stereotype.Service;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import backend.backend.model.Reporte;
import backend.backend.repository.ReporteRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Service
public class ReporteExportService {
    private final ReporteRepository reporteRepository;
    
    public ReporteExportService(ReporteRepository reporteRepository) {
        this.reporteRepository = reporteRepository;
    } // llamamos al repositorio


    //ByteArrayInputStream es una clase que permite manejar flujos de datos en memoria
    //Document es una clase que representa un documento PDF de la libreria iText
    //Paragraph representa un parrafo en el documento PDF traido de iText
    //Element es una clase base para todos los elementos del documento PDF traido de iText
    //PdfPTable representa una tabla en el documento PDF traido de iText
    //PdfPCell representa una celda en una tabla PDF traido de iText

    //Exportar PDF Dinamico
    public ByteArrayInputStream exportarPDF(List<String> campos) throws Exception {
    List<Reporte> reportes = reporteRepository.findAll();
    Document document = new Document();
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    PdfWriter.getInstance(document, out);
    document.open();

    Font tituloFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16);
    Paragraph titulo = new Paragraph("Reporte de Empleados", tituloFont);
    titulo.setAlignment(Element.ALIGN_CENTER);
    document.add(titulo);
    document.add(new Paragraph(" "));

    PdfPTable table = new PdfPTable(campos.size());
    table.setWidthPercentage(100);

    // Encabezados dinámicos
    for (String campo : campos) {
        table.addCell(new PdfPCell(new Phrase(campo.toUpperCase())));
    }

    // Datos dinámicos
    for (Reporte r : reportes) {
        for (String campo : campos) {
            switch (campo.toLowerCase()) {
                case "id":
                    table.addCell(r.getIdReporte().toString());
                    break;
                case "titulo":
                    table.addCell(r.getTitulo());
                    break;
                case "empleado":
                    table.addCell(r.getEmpleado() != null ?
                            r.getEmpleado().getNombres() + " " + r.getEmpleado().getApellidos() : "-");
                    break;
                case "salario":
                    table.addCell(r.getEmpleado() != null ?
                            String.valueOf(r.getEmpleado().getSalario()) : "-");
                    break;
                case "usuario":
                    table.addCell(r.getUsuario() != null ?
                            r.getUsuario().getUsername() : "-");
                    break;
                case "departamento":
                    table.addCell(r.getDepartamento() != null ?
                            r.getDepartamento().getNombre() : "-");
                    break;
                case "fecha":
                    table.addCell(r.getFechaCreacion().toString());
                    break;
                default:
                    table.addCell("-");
                    break;
            }
        }
    }

    document.add(table);
    document.close();
    return new ByteArrayInputStream(out.toByteArray());
}

// Exportar Excel Dinámico
public ByteArrayInputStream exportarExcel(List<String> campos) throws Exception {
    List<Reporte> reportes = reporteRepository.findAll();

    XSSFWorkbook workbook = new XSSFWorkbook();
    XSSFSheet sheet = workbook.createSheet("Reporte Empleados");

    int rowCount = 0;

    // Estilo para encabezados
    CellStyle headerStyle = workbook.createCellStyle();
    XSSFFont font = workbook.createFont();
    font.setBold(true);
    headerStyle.setFont(font);

    // Crear la fila de encabezados
    Row headerRow = sheet.createRow(rowCount++);
    int headerCol = 0;

    for (String campo : campos) {
        Cell cell = headerRow.createCell(headerCol++);
        cell.setCellValue(campo.toUpperCase());
        cell.setCellStyle(headerStyle);
    }

    // Llenado dinámico
    for (Reporte r : reportes) {
        Row row = sheet.createRow(rowCount++);
        int colIndex = 0;

        for (String campo : campos) {
            Cell cell = row.createCell(colIndex++);

            switch (campo.toLowerCase()) {
                case "id":
                    cell.setCellValue(r.getIdReporte());
                    break;
                case "titulo":
                    cell.setCellValue(r.getTitulo());
                    break;
                case "empleado":
                    if (r.getEmpleado() != null) {
                        cell.setCellValue(r.getEmpleado().getNombres()
                                + " " + r.getEmpleado().getApellidos());
                    } else {
                        cell.setCellValue("-");
                    }
                    break;
                case "salario":
                    if (r.getEmpleado() != null) {
                        cell.setCellValue(r.getEmpleado().getSalario());
                    } else {
                        cell.setCellValue("-");
                    }
                    break;
                case "usuario":
                    if (r.getUsuario() != null) {
                        cell.setCellValue(r.getUsuario().getUsername());
                    } else {
                        cell.setCellValue("-");
                    }
                    break;
                case "departamento":
                    if (r.getDepartamento() != null) {
                        cell.setCellValue(r.getDepartamento().getNombre());
                    } else {
                        cell.setCellValue("-");
                    }
                    break;
                case "fecha":
                    cell.setCellValue(r.getFechaCreacion().toString());
                    break;
                default:
                    cell.setCellValue("-");
                    break;
            }
        }
    }

    // Ajustar tamaño automático de columnas
    for (int i = 0; i < campos.size(); i++) {
        sheet.autoSizeColumn(i);
    }

    ByteArrayOutputStream out = new ByteArrayOutputStream();
    workbook.write(out);
    workbook.close();

    return new ByteArrayInputStream(out.toByteArray());
}


}
