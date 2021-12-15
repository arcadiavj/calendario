<?php
class Home extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function home()
    {
        $this->views->getView($this, "index");
    }

    public function registrar()
    {
        if (empty($_POST['title']) || empty($_POST['start']) || empty($_POST['color'])) {
            $mensaje = array(
                'msg' => 'todos los campos son requeridos',
                'estado' => false,
                'tipo' => 'warning'
            );
        } else {
            $evento = $_POST['title'];
            $fecha = $_POST['start'];
            $color = $_POST['color'];
            $id = $_POST['id'];
            if ($id == '') {
                $resp = $this->model->registrar($evento, $fecha, $color);
                if ($resp == 1) {
                    $mensaje = array(
                        'msg' => 'evento creado',
                        'estado' => true,
                        'tipo' => 'success'
                    );
                } else {
                    $mensaje = array(
                        'msg' => 'error al crear evento',
                        'estado' => false,
                        'tipo' => 'error'
                    );
                }
            } else {
                $resp = $this->model->modificar($evento, $fecha, $color, $id);
                if ($resp == 1) {
                    $mensaje = array(
                        'msg' => 'evento modificado',
                        'estado' => true,
                        'tipo' => 'success'
                    );
                } else {
                    $mensaje = array(
                        'msg' => 'error al modificar evento',
                        'estado' => false,
                        'tipo' => 'error'
                    );
                }
            }

            echo json_encode($mensaje);
            die();
        }
    }

    public function listar()
    {
        $data = $this->model->listarEventos();
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function eliminar($id)
    {
        $resp = $this->model->eliminar($id);
        if ($resp == 1) {
            $mensaje = array(
                'msg' => 'evento eliminado',
                'estado' => true,
                'tipo' => 'success'
            );
        } else {
            $mensaje = array(
                'msg' => 'error al eliminar evento',
                'estado' => false,
                'tipo' => 'error'
            );
        }
        echo json_encode($mensaje, JSON_UNESCAPED_UNICODE);
        die();
    }

    public function drop()
    {
        $fecha = $_POST['fecha'];
        $id = $_POST['id'];
        $resp = $this->model->drop($fecha,$id);
        if ($resp == 1) {
            $mensaje = array(
                'msg' => 'evento modificaco',
                'estado' => true,
                'tipo' => 'success'
            );
        } else {
            $mensaje = array(
                'msg' => 'error al modificar evento',
                'estado' => false,
                'tipo' => 'error'
            );
        }
        echo json_encode($mensaje, JSON_UNESCAPED_UNICODE);
        die();
    }
}
