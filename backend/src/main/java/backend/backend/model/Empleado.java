package backend.backend.model;
import  java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "empleados")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmpleado;

    @Column(nullable = false, length = 100)
    private String nombres;

    @Column(length = 100)
    private String apellidos;

    @Column(length = 100)
    private String email;

    @Column(length = 15)
    private String telefono;

    @Column(length = 8, unique = true)
    private String dni;

    @Column(length = 200)
    private String direccion;

    // 🔹 Fecha automática al crear (solo se define una vez)
    @Column(name = "fecha_ingreso", nullable = false, updatable = false)
    private java.time.LocalDate fechaIngreso;

    // 🔹 Fecha de salida manual (se setea cuando el empleado deja la empresa)
    @Column(name = "fecha_salida")
    private java.time.LocalDate fechaSalida;

    @Column(nullable = false)
    private Double salario;

    // Relaciones
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_departamento")
    private Departamento departamento;

    @OneToMany(mappedBy = "empleado", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reporte> reportes;

    // 🔹 Inicializar fecha de ingreso automáticamente
    @PrePersist // Antes de insertar en la base de datos
    //PrePersist es un callback que se ejecuta antes de que la entidad sea persistida en la base de datos.
    //Se utiliza para realizar acciones automáticas, como establecer valores predeterminados o inicializar
    //atributos antes de que la entidad se guarde.
    protected void onCreate() {
        this.fechaIngreso = java.time.LocalDate.now();
    }
}
