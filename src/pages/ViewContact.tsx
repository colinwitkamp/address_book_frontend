import { useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useParams } from "react-router";
import { Contact, fetchContacts } from "../data/contact";
import "./ViewContact.css";

function ViewContact() {
  const [contact, setContact] = useState<Contact>();
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(async () => {
    try {
      const contacts = await fetchContacts();

      setContact(
        contacts.find((c) => {
          return c.CustomerID === params.id;
        })
      );
    } catch (e) {}
  });

  return (
    <IonPage id="view-contact-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Contacts" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {contact ? (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{contact.ContactTitle}</IonCardTitle>
              <IonCardSubtitle>{contact.Email}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <p>ID: {contact.CustomerID}</p>
              <p>
                {contact.Country} {contact.City}
              </p>
              <p>Phone:{contact.Phone}</p>
              <p>Postal Code: {contact.PostalCode}</p>
            </IonCardContent>
          </IonCard>
        ) : (
          <div>Contact not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewContact;
