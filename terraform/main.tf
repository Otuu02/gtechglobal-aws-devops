terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

data "azurerm_resource_group" "rg" {
  name = "VisualStudioOnline-1FA42575C2DD4E6791F652D30228ADB3"
}

data "azurerm_container_registry" "acr" {
  name                = "gtechacr2026"
  resource_group_name = data.azurerm_resource_group.rg.name
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "gtech-aks"
  location            = "eastus"
  resource_group_name = data.azurerm_resource_group.rg.name
  dns_prefix          = "gtechaks"

  default_node_pool {
    name       = "default"
    node_count = 1
    vm_size    = "standard_dc2as_v6"
  }

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_role_assignment" "aks_acr_pull" {
  scope                = data.azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
}
