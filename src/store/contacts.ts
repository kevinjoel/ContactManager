import initialContacts from '@/data/data.json';
import type { Contact, ContactFormData, Department, FiltersState } from '@/types/contact';
import { computed, observable } from '@legendapp/state';
import { configureObservablePersistence, persistObservable } from '@legendapp/state/persist';
import { ObservablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

// Configure persistence globally
configureObservablePersistence({
  pluginLocal: ObservablePersistAsyncStorage,
  localOptions: {
    asyncStorage: {
      AsyncStorage,
    },
  },
});

// Contacts state - loaded from data.json
export const contacts$ = observable<Contact[]>(initialContacts as Contact[]);

// Setup persistence
persistObservable(contacts$, {
  local: 'contacts',
});

// Filters state (reactive)
export const filters$ = observable<FiltersState>({
  search: '',
  department: null,
});

// Loading state
export const isLoading$ = observable(true);

// Computed: filtered contacts
export const filteredContacts$ = computed(() => {
  const contacts = contacts$.get();
  const { search, department } = filters$.get();

  if (!Array.isArray(contacts)) return [];

  return contacts.filter((contact) => {
    const matchesSearch =
      search === '' ||
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment = department === null || contact.department === department;

    return matchesSearch && matchesDepartment;
  });
});

// Computed: results count
export const resultsCount$ = computed(() => {
  return filteredContacts$.get().length;
});

// Actions
export const addContact = (data: ContactFormData) => {
  const newContact: Contact = {
    id: uuid.v4(),
    ...data,
  };
  const currentContacts = contacts$.get();
  if (Array.isArray(currentContacts)) {
    contacts$.set([...currentContacts, newContact]);
  } else {
    contacts$.set([newContact]);
  }
};

export const deleteContact = (id: string) => {
  const currentContacts = contacts$.get();
  if (Array.isArray(currentContacts)) {
    contacts$.set(currentContacts.filter((c) => c.id !== id));
  }
};

export const setSearchFilter = (search: string) => {
  filters$.search.set(search);
};

export const setDepartmentFilter = (department: Department | null) => {
  filters$.department.set(department);
};

export const clearFilters = () => {
  filters$.set({ search: '', department: null });
};

// Initialize loading state
export const initializeStore = () => {
  // Simulate initial loading
  setTimeout(() => {
    isLoading$.set(false);
  }, 1000);
};
