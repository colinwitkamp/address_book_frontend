import { useState, useEffect, useContext } from "react";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonSearchbar,
  IonSelect,
  IonItem,
  IonSelectOption,
  IonButton,
  IonRadioGroup,
  IonRadio,
} from "@ionic/react";

import ContactListItem from "../components/ContactListItem";
import { Contact, fetchContacts } from "../data/contact";
import "./Home.css";

const properties = [
  "CustomerID",
  "ContactName",
  "ContactTitle",
  "CompanyName",
  "Email",
  "Address",
  "Phone",
  "PostalCode",
  "Country",
  "City",
  "Fax",
];

const Home: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filterd, setFiltered] = useState<Contact[]>([]);
  const [keyword, setKeyword] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [view, setView] = useState("card");

  useIonViewWillEnter(async () => {
    try {
      const contacts = await fetchContacts();
      console.info("Contacts fetched:", contacts);
      setContacts(contacts);
      setFiltered(contacts);
      setCountries(
        contacts
          .map((c) => {
            return c.Country;
          })
          .filter(function (item, pos, a) {
            return a.indexOf(item) === pos;
          })
          .sort()
      );
    } catch (e) {
      console.error(e);
      alert("Failed to fetch contacts!");
    }
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  useEffect(() => {
    setFiltered(
      contacts.filter((c) => {
        return (
          JSON.stringify(c).toLowerCase().includes(keyword) &&
          (c.Country === country || !country)
        );
      })
    );
  }, [contacts, keyword, country]);

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contacts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Contacts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonToolbar>
          <IonSearchbar
            onIonInput={(e: any) => {
              setKeyword(e.detail.value);
            }}
            value={keyword}
          ></IonSearchbar>

          <IonList className="ion-padding">
            <IonItem>
              <IonSelect
                aria-label="country"
                placeholder="Select country"
                value={country}
                onIonChange={(e) => {
                  setCountry(e.detail.value);
                }}
              >
                {countries.map((c) => {
                  return (
                    <IonSelectOption value={c} key={c}>
                      {c}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
              {country && (
                <IonButton
                  onClick={() => {
                    setCountry("");
                  }}
                >
                  Clear
                </IonButton>
              )}
            </IonItem>
          </IonList>
          <div className="ion-padding">
            <IonRadioGroup
              value={view}
              className="row"
              onIonChange={(e) => {
                setView(e.detail.value);
              }}
            >
              <IonRadio value="card">Card</IonRadio> &nbsp;&nbsp;&nbsp;
              <IonRadio value="table">Table</IonRadio>
              <br />
            </IonRadioGroup>
          </div>
        </IonToolbar>

        {view === "card" ? (
          <IonList className="row">
            {filterd.map((c) => (
              <ContactListItem key={c.CustomerID} contact={c} />
            ))}
          </IonList>
        ) : (
          <div className="ion-padding">
            <table>
              <thead>
                <tr>
                  {properties.map((p) => {
                    return (
                      <th key={`header_${p}}`}>
                        <div>{p}</div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filterd.map((c: any) => {
                  return (
                    <tr key={c.CustomerID}>
                      {properties.map((p) => {
                        return (
                          <td key={`${c.CustomerID}_${p}}`}>
                            <small>{c[p]}</small>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
