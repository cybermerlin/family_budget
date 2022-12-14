### DevOps

#### CHEF
Chef — это инструмент управления конфигурацией, который позволяет вам организовать программное управление своей инфраструктурой, окружениями и конечно же приложениями. Он использует концепцию называемую «поваренными книгами» (cookbooks) для программного определения конечного состояния вашей инфраструктуры и настройки виртуальных или физических машин в соответствии с указанными вами правилами. Вы можете настроить Chef клиент, который будет запущен на всех ваших серверах, на скачивание «кулинарных книг» с главного сервера Chef с последующим применением определенных в них конфигураций на нужных вам серверах, например, в зависимости от их роли.

#### PUPPET
Puppet — еще один инструмент управления конфигурацией для управления версиями, автоматизации тестирования и непрерывной доставки. Конфигурационный код Puppet содержится модулях и написан на Puppet DSL, позволяя вам определять свою инфраструктуру в виде кода и тестировать изменения перед их развертыванием в продуктиве. Благодаря функциям автоматизации Puppet вы сможете быть 100% уверены в том, что ваши релизы будут проходить одинаковым образом раз за разом.

#### VAGRANT
Если вы хотите использовать виртуальные машины для сред ваших разработчиков, то Vagrant является одним из лучших инструментов для решения этой задачи. Инструмент поддерживает все современные средства виртуализации, такие как, например, VirtualBox, VMware и Hyper-V. Он использует файл конфигурации под названием Vagrantfile, в котором могут быть заданы все необходимые настройки для виртуальных машин окружения. После создания виртуальной машины или их группы вы можете поделиться ею с другими разработчиками или использовать плагины для подключения к ним Puppet или Chef.

#### ANSIBLE
Ansible автоматизирует управление конфигурацией, запуск инфраструктуры в облаке или системах контейнерной оркестрации, развертывание приложений и многое другое. Модули конфигурации в Ansible известны как Плей-листы («playbooks»). Плей-листы описаны в формате YAML, что упрощает их написание по сравнению с другими инструментми управления конфигурацией. Простота Ansible не только поможет вам эффективно управлять множеством фрагментов вашей инфраструктуры, но также и устранит проблемы совместимости между версиями сервера и агента, как это иногда бывает у Chef или Puppet.

#### PACKER
Создает идентичные образы ВМ для множества платформ из единого набора конфигов.

#### PULUMI

Like an Terraform decision. [See](https://github.com/x-technology/x-technology/blob/main/pulumi.md#pulumi)
