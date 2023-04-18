import {
  IonItem,
  IonCard,
  IonCardContent,
  IonCardHeader,
} from "@ionic/react";
import { Contact } from "../data/contact";
import "./ContactListItem.css";

interface ContactListItemProps {
  contact: Contact;
}

const ContactListItem: React.FC<ContactListItemProps> = ({ contact }) => {
  return (
    <IonItem routerLink={`/contacts/${contact.CustomerID}`} detail={false}>
      <IonCard>
        <div slot="start" className="dot dot-unread"></div>
        <IonCardHeader>
          <h2>{contact.ContactName}</h2>
          <p>{contact.ContactTitle}</p>
          <p>{contact.CompanyName}</p>
        </IonCardHeader>

        <IonCardContent>
          <p>
            {contact.Country} {contact.City}
          </p>
          <p>{contact.Address}</p>
          <p>{contact.Email}</p>
          <p>CustomerID: {contact.CustomerID}</p>
          <p>{contact.Phone}</p>
          <p>{contact.Fax}</p>
          <p>{contact.PostalCode}</p>
        </IonCardContent>
      </IonCard>
    </IonItem>
  );
};

export default ContactListItem;
