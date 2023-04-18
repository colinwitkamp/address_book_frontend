export interface Contact {
  CompanyName: string;
  Email: string;
  Address: string;
  Phone: string;
  PostalCode: string;
  Country: string;
  CustomerID: string;
  City: string;
  Fax: string;
  ContactName: string;
  ContactTitle: string;
}

export const fetchContacts = async () => {
  const properties = [
    "CompanyName",
    "Email",
    "Address",
    "Phone",
    "PostalCode",
    "Country",
    "CustomerID",
    "City",
    "Fax",
    "ContactName",
    "ContactTitle",
  ];

  let result = [];
  const res = await fetch("http://localhost:5000/api/ab.xml");
  const text = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/xml");
  const addressBook = doc.getElementsByTagName("AddressBook")[0];
  const contactsDom = addressBook.getElementsByTagName("Contact");
  for (let i = 0; i < contactsDom.length; i++) {
    const contact: any = {};
    properties.forEach((tag) => {
      try {
        contact[tag] = contactsDom[i].getElementsByTagName(tag)[0].innerHTML;
      } catch {}
    });
    result.push(contact as unknown as Contact);
  }
  return result;
};
