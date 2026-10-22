import axios from 'axios'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from '../services/api'
import type { Product } from '../types/product'

interface ProductStore {
  products: Product[]
  categories: string[]
  selectedCategory: string
  searchQuery: string
  loading: boolean
  error: string | null
  fetchProducts: (category?: string, signal?: AbortSignal) => Promise<void>
  fetchCategories: (signal?: AbortSignal) => Promise<void>
  setCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  clearError: () => void
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      categories: [],
      selectedCategory: 'all',
      searchQuery: '',
      loading: false,
      error: null,
      fetchProducts: async (category = get().selectedCategory, signal) => {
        set({ loading: true, error: null })
        try {
          const products =
            category === 'all'
              ? await getProducts(signal)
              : await getProductsByCategory(category, signal)
          set({ products, loading: false })
        } catch (error) {
          if (axios.isCancel(error)) return
          set({
            loading: false,
            error: 'No pudimos cargar los productos. Inténtalo de nuevo.',
          })
        }
      },
      fetchCategories: async (signal) => {
        try {
          const categories = await getCategories(signal)
          set({ categories })
        } catch (error) {
          if (!axios.isCancel(error)) {
            set({ error: 'No pudimos cargar las categorías.' })
          }
        }
      },
      setCategory: (selectedCategory) => set({ selectedCategory }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'techstore-preferences',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selectedCategory: state.selectedCategory }),
    },
  ),
)
