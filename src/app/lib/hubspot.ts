// src/app/lib/hubspot.ts
type HubspotContact = {
  email: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  company?: string;
  nip?: string;
  jobtitle?: string;
  website?: string;
  city?: string;
};

type HubspotCompany = {
  name: string;
  nip?: string;
  domain?: string;
  phone?: string;
  city?: string;
  address?: string;
  zip?: string;
};

type HubspotDeal = {
  dealname: string;
  dealstage?: string;
  amount?: number;
  pipeline?: string;
  closedate?: string;
  description?: string;
  dealtype?: string;
};

/**
 * Creates or updates a contact in HubSpot
 */
export async function createOrUpdateContact(contact: HubspotContact) {
  try {
    const apiKey = process.env.HUBSPOT_API_KEY;
    if (!apiKey) {
      console.error('❌ Missing HUBSPOT_API_KEY environment variable');
      return null;
    }
    
    // Prepare properties in HubSpot format
    const properties: Record<string, string> = {};
    Object.entries(contact).forEach(([key, value]) => {
      if (value) properties[key] = value.toString();
    });
    
    // Check if contact exists
    const searchResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: contact.email
                }
              ]
            }
          ]
        })
      }
    );
    
    const searchData = await searchResponse.json();
    
    if (searchData.total > 0) {
      // Update existing contact
      const contactId = searchData.results[0].id;
      const updateResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            properties
          })
        }
      );
      
      if (!updateResponse.ok) {
        throw new Error(`Failed to update contact: ${updateResponse.statusText}`);
      }
      
      return { id: contactId, isNew: false };
    } else {
      // Create new contact
      const createResponse = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            properties
          })
        }
      );
      
      if (!createResponse.ok) {
        throw new Error(`Failed to create contact: ${createResponse.statusText}`);
      }
      
      const createData = await createResponse.json();
      return { id: createData.id, isNew: true };
    }
  } catch (error) {
    console.error('❌ HubSpot API error:', error);
    return null;
  }
}

/**
 * Creates a company in HubSpot
 */
export async function createCompany(company: HubspotCompany) {
  try {
    const apiKey = process.env.HUBSPOT_API_KEY;
    if (!apiKey) {
      console.error('❌ Missing HUBSPOT_API_KEY environment variable');
      return null;
    }
    
    // Prepare properties in HubSpot format
    const properties: Record<string, string> = {};
    Object.entries(company).forEach(([key, value]) => {
      if (value) properties[key] = value.toString();
    });
    
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/companies`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          properties
        })
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to create company: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('❌ HubSpot API error:', error);
    return null;
  }
}

/**
 * Creates a deal in HubSpot
 */
export async function createDeal(deal: HubspotDeal, contactId?: string, companyId?: string) {
  try {
    const apiKey = process.env.HUBSPOT_API_KEY;
    if (!apiKey) {
      console.error('❌ Missing HUBSPOT_API_KEY environment variable');
      return null;
    }
    
    // Prepare properties in HubSpot format
    const properties: Record<string, string> = {};
    Object.entries(deal).forEach(([key, value]) => {
      if (value !== undefined) properties[key] = value.toString();
    });
    
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/deals`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          properties,
          associations: [
            ...(contactId ? [{
              to: { id: contactId },
              types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }]
            }] : []),
            ...(companyId ? [{
              to: { id: companyId },
              types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 5 }]
            }] : [])
          ]
        })
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to create deal: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('❌ HubSpot API error:', error);
    return null;
  }
}
