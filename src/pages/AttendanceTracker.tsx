import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonButton,
  IonList,
  IonInput,
  IonButtons,
  IonMenuButton
} from '@ionic/react';

interface Student {
  id: number;
  name: string;
  present: boolean;
}

const AttendanceTracker: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<string>('');

  const handleAddStudent = () => {
    if (newStudent.trim() === '') return;
    const newEntry: Student = {
      id: Date.now(),
      name: newStudent.trim(),
      present: false
    };
    setStudents([...students, newEntry]);
    setNewStudent('');
  };

  const toggleAttendance = (id: number) => {
    setStudents(prev =>
      prev.map(student =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const saveAttendance = () => {
    console.log('Attendance saved:', students);
    alert('Attendance saved successfully!');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Attendance Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

        <IonItem>
          <IonInput
            value={newStudent}
            placeholder="Enter student name"
            onIonChange={e => setNewStudent(e.detail.value!)}
          />
          <IonButton onClick={handleAddStudent}>Add</IonButton>
        </IonItem>

        <IonList>
          {students.map(student => (
            <IonItem key={student.id}>
              <IonLabel>{student.name}</IonLabel>
              <IonCheckbox
                slot="end"
                checked={student.present}
                onIonChange={() => toggleAttendance(student.id)}
              />
            </IonItem>
          ))}
        </IonList>

        {students.length > 0 && (
          <IonButton expand="block" color="success" onClick={saveAttendance}>
            Save Attendance
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AttendanceTracker;
