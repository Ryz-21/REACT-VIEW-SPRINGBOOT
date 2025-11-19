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

//exportar excel dinamico


}
