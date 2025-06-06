import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getById } from "../api/students";
import useStudentUpdate from "../hooks/useStudentUpdate";
import StudentForm from "../components/StudentForm/StudentForm";

export default function StudentEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ["student", id],
        queryFn: () => getById(id),
        enabled: !!id,
    });
    const { mutate } = useStudentUpdate(id, () => navigate("/"));

    if (isLoading) return <p>Cargando perfil...</p>;

    return <StudentForm student={data} onSubmit={mutate} />;
}
