import fs from 'fs';
import path from 'path';

export function generateRandomFirstName() {
  const names = ['Juan', 'Maria', 'Pedro', 'Ana', 'Luis', 'Lucia', 'Carlos', 'Elena', 'Diego', 'Sofia'];
  
  const randomFirstName = names[Math.floor(Math.random() * names.length)];

  return `${randomFirstName}`;
}

export function generateRandomLastName() {
  const names = ['Perez', 'Fernandez', 'Garcia', 'Rodriguez', 'Lopez', 'Martinez', 'Hernandez', 'Gonzalez', 'Sanchez', 'Ramirez'];
  
  const randomLastName = names[Math.floor(Math.random() * names.length)];
  
  return `${randomLastName}`;
}


export function generateRandomEmail() {
  const timestamp = Date.now();
  return `qa_${timestamp}@gmail.com`;
}

export function generateRandomPassword() {
  const timestamp = Date.now();
  const specials = "!@#$%^&*()_+";
  // Elegimos dos caracteres especiales al azar
  const randomSpecials = specials[Math.floor(Math.random() * specials.length)] + specials[Math.floor(Math.random() * specials.length)];
  
  return `Pass_${timestamp}${randomSpecials}`;
}

export function generateRandomBirthday() {
  const randomDate = new Date(Math.random() * (new Date(2010, 0, 1).getTime() - new Date(1970, 0, 1).getTime()) + new Date(1970, 0, 1).getTime());

  const month = String(randomDate.getMonth() + 1).padStart(2, '0');
  const day = String(randomDate.getDate()).padStart(2, '0');
  const year = randomDate.getFullYear();

  return `${month}/${day}/${year}`;
}

export function generateRandomLocation() {
      const streets = ['Main St', 'Second St', 'Oak St', 'Park Ave', 'Washington St', 'Lakeview Dr', 'Broadway'];
      const locations = [
        { city: 'New York', state: 'NY', stateFull: 'New York' },
        { city: 'Los Angeles', state: 'CA', stateFull: 'California' },
        { city: 'Chicago', state: 'IL', stateFull: 'Illinois' },
        { city: 'Houston', state: 'TX', stateFull: 'Texas' },
        { city: 'Miami', state: 'FL', stateFull: 'Florida' }
    ];
  
      const randomStreet = streets[Math.floor(Math.random() * streets.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const zipCode = Math.floor(Math.random() * 90000 + 10000).toString();

      return {
        address: randomStreet,
        city: location.city,
        state: location.stateFull,
        zipCode: zipCode
    };
}



export function saveUserData(firstName, lastName, email, password) {
    const filePath = path.join(process.cwd(), 'users.csv');
    const date = new Date().toLocaleString();
    
    // Formato: fecha, firstName, lastName, email, password, birthDay, address
    const line = `${date},${firstName},${lastName},${email},${password}\n`;

    if (!fs.existsSync(filePath)) {
        const header = "Fecha_Registro,Hora_Registro,Nombre,Apellido,Email,Password\n";
        fs.writeFileSync(filePath, header, 'utf8');
    }

    fs.appendFileSync(filePath, line, 'utf8');
    
    console.log(`✅ Datos de ${email} guardados en users.csv`);

    }

    
